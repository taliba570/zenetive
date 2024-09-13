import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Schema()
export class Settings extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ default: 25 })
  workTime: number;

  @Prop({ default: 5 })
  shortBreakTime: number;

  @Prop({ default: 15 })
  longBreakTime: number;

  @Prop({ 
    type: Object,
    default: {
      thundreStorm: { enabled: false, volume: 0 },
      singingBowl: { enabled: false, volume: 0 },
      whiteNoise: { enabled: false, volume: 0 },
      coffeeShop: { enabled: false, volume: 0 },
      crickets: { enabled: false, volume: 0 },
      birds: { enabled: false, volume: 0 },
      waves: { enabled: false, volume: 0 },
      train: { enabled: false, volume: 0 },
      fire: { enabled: false, volume: 0 },
      rain: { enabled: false, volume: 0 },
      wind: { enabled: false, volume: 0 },
    }
   })
  soundPreferences: {
    waves?: { enabled: boolean; volume: number };
    fire?: { enabled: boolean; volume: number };
    train?: { enabled: boolean; volume: number };
    rain?: { enabled: boolean; volume: number };
    thundreStorm?: { enabled: boolean; volume: number };
    singingBowl?: { enabled: boolean; volume: number };
    whiteNoise?: { enabled: boolean; volume: number };
    crickets?: { enabled: boolean; volume: number };
    birds?: { enabled: boolean; volume: number };
    wind?: { enabled: boolean; volume: number };
    coffeeShop?: { enabled: boolean; volume: number };
  };
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);