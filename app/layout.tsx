import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearNova - An AI powered learning platform",
  description: "LearNova is an AI powered learning platform that helps you learn better and faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}