/** @type {import('next').NextConfig} */

module.exports = {
    sass: true,
    modules: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
        ],
    },
};
