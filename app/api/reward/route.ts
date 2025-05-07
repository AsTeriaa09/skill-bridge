import { NextResponse } from 'next/server';
import { connectToDB } from "../../db/connection";
import { RewardSchema } from '../../db/models/reward';

export async function GET() {
  await connectToDB();
  const rewards = await RewardSchema.find({});
  return NextResponse.json(rewards);
}

export async function POST(request: Request) {
  await connectToDB();
  const data = await request.json();
  const reward = await RewardSchema.create(data);
  return NextResponse.json(reward, { status: 201 });
}