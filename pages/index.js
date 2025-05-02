import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    const userInfo = tg.initDataUnsafe.user;
    setUser(userInfo);

    // Send user ID to backend to get photo
    fetch("/api/photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userInfo.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.photo_url) {
          setPhotoUrl(`https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/${data.photo_url}`);
        }
      });
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Telegram Profile</h1>
      {user ? (
        <div>
          {photoUrl && <img src={photoUrl} width={100} style={{ borderRadius: "50%" }} />}
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Username:</strong> @{user.username}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
