import clientPromise from "@/lib/mongodb/mongodb";
import { ObjectId } from 'mongodb'; // MongoDB ObjectId를 import합니다.
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const page = parseInt(query.page as string) || 1;
  const limit = 50;  // 페이지 당 50개의 자료를 보여줌

  try {
    const client = await clientPromise;
    const db = client.db("onel-list");

    // 검색 조건 처리
    const searchQuery: Record<string, any> = {};
    if (query.searchType && query.searchText) {
      if (query.searchType === "shopName") {
        searchQuery.title = { $regex: query.searchText, $options: "i" }; // 업체명 검색
      } else if (query.searchType === "shopAdd") {
        searchQuery.addresses = { $regex: query.searchText, $options: "i" }; // 업체주소 검색
      }
    }

    if (query.shopCode) {
      try {
        searchQuery._id = new ObjectId(query.shopCode as string); // 업체 번호 검색
      } catch (error) {
        return res.status(400).json({ error: "Invalid shop code format" });
      }
    }

    if (query.address) {
      // 입력된 주소를 공백 기준으로 분리하여 각 단어가 모두 포함된 주소를 검색
      const addressKeywords = (query.address as string).split(' ').filter(Boolean);
      searchQuery.addresses = { $regex: addressKeywords.map(keyword => `(?=.*${keyword})`).join(''), $options: "i" };
    }

    if (query.status) {
      searchQuery.status = parseInt(query.status as string); // 영업상태 검색
    }

    // 총 개수 가져오기
    const total = await db.collection("nailshops").countDocuments(searchQuery);

    // 데이터 가져오기
    const shops = await db
      .collection("nailshops")
      .find(searchQuery, {
        projection: {
          _id: 1,
          search_url: 1,
          addresses: 1,
          blog_review: 1,
          category: 1,
          facilities: 1,
          human_review: 1,
          image_urls: 1,
          introduction: 1,
          operating_hours: 1,
          price_info: 1,
          title: 1,
          x: 1,
          y: 1,
        },
      })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.status(200).json({ items: shops, total });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
