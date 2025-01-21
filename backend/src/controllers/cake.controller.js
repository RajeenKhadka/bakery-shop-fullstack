import Cake from "../models/cake.model.js";

async function seed(req, res) {
  try {
    await Cake.create([
      {
        name: "The Suit Cake",
        description:
          "A dapper cake design resembling a tailored suit. Perfect for weddings, anniversaries, or any formal celebration.",
        category: "Designer Cake",
        price: 200,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336452/Suit-Cake_kefigo.jpg",
      },
      {
        name: "Pokemon Cake",
        description: "A fun cake for Pokemon fans featuring colorful designs.",
        category: "Event Cakes",
        price: 120,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336454/Pokemon-Cake_ofwrxn.jpg",
      },
      {
        name: "The Gatsby Cake",
        description:
          "A glamorous, vintage-inspired cake perfect for a Gatsby-themed event.",
        category: "Formal Cakes",
        price: 80,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336455/The-Gatsby-Cake_v8zu3z.jpg",
      },
      {
        name: "Spooky Cake",
        description: "A Halloween-inspired cake with a spooky design.",
        category: "Event Cakes",
        price: 100,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336455/Spooky-Cake_pcshpt.jpg",
      },
      {
        name: "Simple Cake",
        description: "A minimalist design cake for any occasion.",
        category: "Designer Cakes",
        price: 60,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336455/Simple-Cake_dclqmh.jpg",
      },
      {
        name: "Rabbit Cake",
        description: "A cute cake shaped like a rabbit for animal lovers.",
        category: "Custom Cakes",
        price: 90,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336454/Rabbit-Cake_repb2w.jpg",
      },
      {
        name: "Lego Cake",
        description: "A creative cake designed to look like a Lego structure.",
        category: "Event Cakes",
        price: 150,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/Lego-Cake_k8arkg.jpg",
      },
      {
        name: "White Vintage Cake",
        description: "A vintage-style cake with delicate white decor.",
        category: "Formal Cakes",
        price: 35,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/White-Vintage-Cake_lr4hry.jpg",
      },
      {
        name: "Bear Cake",
        description: "A bear-shaped cake for animal-themed parties.",
        category: "Custom Cakes",
        price: 100,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/Bear-Cake_yrohum.jpg",
      },
      {
        name: "Unicorn Cake",
        description: "A magical unicorn-themed cake for fantasy lovers.",
        category: "Designer Cakes",
        price: 150,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/Unicorn-Cake_ytgynn.jpg",
      },
      {
        name: "Tiger Cake",
        description: "A fierce cake shaped like a tiger for animal lovers.",
        category: "Custom Cakes",
        price: 80,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/Tiger-Cake_ybqe95.jpg",
      },
      {
        name: "Gender Reveal Cake",
        description:
          "A gender reveal cake that’s perfect for your special moment.",
        category: "Celebration Cakes",
        price: 70,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336453/Gender-Reveal-Cake_tjvibc.jpg",
      },
      {
        name: "Pompompurin Cake",
        description: "A cute cake featuring Pompompurin for Sanrio lovers.",
        category: "Designer Cakes",
        price: 80,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336452/Pompompurin-Cake_p0w1mu.jpg",
      },
      {
        name: "Panda Police Cake",
        description: "A fun cake featuring a panda in a police uniform.",
        category: "Custom Cakes",
        price: 90,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336452/Panda-Police-Cake_y4w3up.jpg",
      },
      {
        name: "Rainbow Pony Cake",
        description: "A colorful and vibrant rainbow pony-themed cake.",
        category: "Event Cakes",
        price: 90,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336452/Rainbow-Pony-Cake_zm6vur.jpg",
      },
      {
        name: "Bunny Cake",
        description:
          "A cute bunny-themed cake perfect for spring celebrations.",
        category: "Celebration Cakes",
        price: 100,
        imageUrl:
          "https://res.cloudinary.com/dexeqks1w/image/upload/v1737336452/Bunny-Cake_xkj2mo.jpg",
      },
    ]);
    res.send("successful").status(200);
  } catch (err) {
    res.send(err).status(400);
  }
}

const getEntries = async (req, res) => {
  try {
    const foundEntries = await Cake.find({});
    res.status(200).json(foundEntries);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { seed, getEntries };
