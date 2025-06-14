// app/api/about/route.js
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // อ่านไฟล์ about.md จากโฟลเดอร์ content
    const aboutFilePath = path.join(process.cwd(), 'content', 'about.md');
    const fileContent = await fs.readFile(aboutFilePath, 'utf8');
    
    // Parse markdown file with front matter
    const { data } = matter(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading about.md:', error);
    
    // Return fallback data if file doesn't exist
    return NextResponse.json({
      about: {
        title: "Phonix Progressive Technology",
        description: [
          "Established in 2022 with a paid-up capital of THB6m.",
          "The company started by taking over the pump division business of Jebsen & Jessen Technology Thailand.",
          "12 employees from Sales, Services and Business Admin, with a combined Pump and Motors experience of more than 30 years.",
          "We provide a wide range of fluid pumping solutions to the commercial and residential building sectors including those for water treatment, irrigation, booster pumps and service water as well as industrial sectors including power plant, fertilizer, mining, petrochemical, chemical, steel, sugar, pulp & paper and palm oil.",
          "Business operations are located in Lad Krabang with a fully operational workshop and warehouse facility.",
          "Representing Top Tier Pumps and Motors brands in Thailand and Southeast Asia.",
          "Serving more than 500 customers and through a nationwide dealer network."
        ],
        image: "/images/favicon.png"
      }
    });
  }
}