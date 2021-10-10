/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE.ENV === 'development',
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost:5000'],
  },
});
