export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const { user_id } = req.body;

  // Get the user's profile photo
  const photos = await fetch(`https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${user_id}&limit=1`);
  const data = await photos.json();

  if (data.ok && data.result.total_count > 0) {
    const fileId = data.result.photos[0][0].file_id;

    // Get the file path
    const fileInfo = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
    const fileData = await fileInfo.json();

    return res.status(200).json({ photo_url: fileData.result.file_path });
  }

  res.status(200).json({ photo_url: null });
}
