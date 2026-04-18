This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment (Hostinger VPS)

Follow these steps to deploy on your Hostinger VPS (Ubuntu 24.04):

**Step 1:** SSH into your VPS:
```bash
ssh root@YOUR_VPS_IP
```

**Step 2:** Clone the repository:
```bash
git clone https://github.com/your-username/savar-science-society.git /root/savar-science-society
```

**Step 3:** Create and configure the `.env` file:
```bash
cp /root/savar-science-society/.env.example /root/savar-science-society/.env
nano /root/savar-science-society/.env
```
*(Fill in your actual database credentials and domain details)*

**Step 4:** Generate security secrets for NextAuth:
```bash
openssl rand -base64 32  # Copy result to NEXTAUTH_SECRET
openssl rand -base64 32  # Copy result to AUTH_SECRET
```

**Step 5:** Build and start the Docker containers:
```bash
cd /root/savar-science-society
docker compose build --no-cache
docker compose up -d
```

**Step 6:** Run database migrations:
```bash
docker compose exec app npx prisma migrate deploy
```

**Step 7:** (Optional) Seed the database:
```bash
docker compose exec app node prisma/seed.js
```

**Step 8:** Configure Nginx as a reverse proxy:
```bash
sudo nano /etc/nginx/sites-available/savar-science-society
```
*(Paste the contents of `nginx-vps.conf` from this project)*

**Step 9:** Enable the Nginx configuration:
```bash
sudo ln -s /etc/nginx/sites-available/savar-science-society /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Step 10:** Install SSL Certificate (Certbot):
```bash
sudo certbot --nginx -d savarsciencesociety.edu.bd -d www.savarsciencesociety.edu.bd
```

**Step 11:** For future updates, simply run:
```bash
bash scripts/deploy.sh
```
