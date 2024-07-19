// pages/api/sample/shop/[id].ts
import clientPromise from "@/lib/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("onel-list");

    const shop = await db.collection("nailshops").findOne({ _id: new ObjectId(id as string) });

    if (!shop) {
      return res.status(404).json({ message: "업체를 찾을 수 없습니다." });
    }

    // 데이터 구조 명확히 지정
    const responseData = {
      _id: shop._id.toString(),
      search_url: shop.search_url || "",
      title: shop.title || "",
      category: shop.category || "",
      human_review: shop.human_review || "",
      blog_review: shop.blog_review || "",
      addresses: shop.addresses || "",
      x: shop.x || "",
      y: shop.y || "",
      introduction: shop.introduction || "",
      facilities: shop.facilities || [],
      image_urls: shop.image_urls || [],
      operating_hours: shop.operating_hours || "",
      status: shop.status || 0,
      createdBy: shop.createdBy || "",
      updatedBy: shop.updatedBy || [],
      createdAt: shop.createdAt || new Date(),
      updatedAt: shop.updatedAt || new Date(),
      __v: shop.__v || 0,
    };

    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
