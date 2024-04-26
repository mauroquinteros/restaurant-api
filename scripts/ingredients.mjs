import fs from 'fs';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function getMongoConnection() {
  await mongoose.connect(process.env.MONGODB_URI);
}

async function insertData() {
  try {
    await getMongoConnection();

    const Schema = new mongoose.Schema(
      {
        name: { type: String },
        stock: { type: Number },
      },
      {
        timestamps: true,
      },
    );
    const Ingredient = mongoose.model('Ingredient', Schema);

    const data = fs.readFileSync('./ingredients.json');
    const ingredients = JSON.parse(data);

    for (const ingredient of ingredients) {
      const newIngredient = new Ingredient(ingredient);
      await newIngredient.save();
      console.log(`Saved ${ingredient.name} to the database`);
    }

    console.log('All ingredients inserted successfully!');
  } catch (error) {
    console.error('Error inserting ingredients: ', error);
  } finally {
    mongoose.disconnect();
  }
}

insertData();
