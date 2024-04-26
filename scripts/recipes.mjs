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

    const IngredientSchema = new mongoose.Schema(
      {
        name: { type: String },
        stock: { type: Number },
      },
      {
        timestamps: true,
      },
    );
    const Ingredient = mongoose.model('Ingredient', IngredientSchema);

    const IngredientsSchema = new mongoose.Schema(
      {
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        quantity: { type: Number },
      },
      {
        _id: false,
      },
    );

    const RecipeSchema = new mongoose.Schema(
      {
        name: { type: String },
        ingredients: { type: [IngredientsSchema] },
      },
      {
        timestamps: true,
      },
    );
    const Recipe = mongoose.model('Recipe', RecipeSchema);

    const data = fs.readFileSync('./recipes.json');
    const recipes = JSON.parse(data);

    for (const recipe of recipes) {
      const ingredients = await Promise.all(
        recipe.ingredients.map(async (ingredient) => {
          const data = await Ingredient.findOne({ name: ingredient.name }).exec();
          return { ingredient: data.id, quantity: ingredient.quantity };
        }),
      );
      const newRecipe = new Recipe({
        name: recipe.name,
        ingredients,
      });
      await newRecipe.save();
      console.log(`Saved ${recipe.name} to the database`);
    }

    console.log('All recipes inserted successfully!');
  } catch (error) {
    console.error('Error inserting ingredients: ', error);
  } finally {
    mongoose.disconnect();
  }
}

insertData();
