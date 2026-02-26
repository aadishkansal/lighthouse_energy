import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

let supabase = null;

const connectDB = () => {
  if (supabase) return supabase;

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials missing in .env");
    }

    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase Client Initialized Successfully");
    return supabase;
  } catch (error) {
    console.error(`Error initializing Supabase: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
