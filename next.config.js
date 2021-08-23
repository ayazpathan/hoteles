// this is custom config file for the project

module.exports = {
  env: {
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "091d1716b51872",
    SMTP_PASSWORD: "e5fc9ae22b24d4",
    SMTP_FROM_NAME: "Hoteles",
    SMTP_FROM_EMAIL: "noreply@hoteles.com",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
