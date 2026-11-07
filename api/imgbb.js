export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // افزایش حجم مجاز برای دریافت عکس بیس‌۶۴ از کاربر
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = "32b44cf4a92e03d876d7d02104feabfb";
  
  try {
    const { image } = req.body; // بیس ۶۴ عکس
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // استفاده از FormData استاندارد برای ارسال به ایمیج‌بی
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', image);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
