document.getElementById('downloadBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const status = document.getElementById('status');

    if (!urlInput) {
        status.textContent = "❌ Please enter a YouTube URL !";
        return;
    }

    status.textContent = "⏳ Fetching video...";

    try {
        const encodedUrl = encodeURIComponent(urlInput);
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodedUrl}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data.success) {
            status.textContent = "❌ Failed to fetch video!";
            return;
        }

        // Auto-download using original filename from API
        const a = document.createElement('a');
        a.href = data.result.download_url;
        a.download = ""; // Let browser decide the filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        status.textContent = "✅ Download it!";

    } catch (err) {
        console.error(err);
        status.textContent = `❌ Error: ${err.message}`;
    }
});