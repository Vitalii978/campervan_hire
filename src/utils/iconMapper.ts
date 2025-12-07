
const iconMapping: Record<string, string> = {

  AC: "icon-wind",
  kitchen: "icon-cup-hot",
  TV: "icon-tv",
  bathroom: "icon-shower",
  
  
  transmission: "icon-diagram",
  fuel: "icon-fuel-pump",
  automatic: "icon-diagram",
  
  
  van: "icon-bi_grid-1x2",
  integrated: "icon-bi_grid-3x3",
  alcove: "icon-bi_grid",
  

  generator: "icon-wind",
  microwave: "icon-microwave",
  refrigerator: "icon-fridge",
  water: "icon-water-drop",
  gas: "icon-hugeicons_gas-stove",
  

  "boom-box": "icon-boom-box", 
  
  
  heart: "icon-heart",
  star: "icon-star",
  mapPin: "icon-Logo",
};

export function getIconName(key: string): string {
  
  const lowerKey = key.toLowerCase();
  
  
  const iconName = iconMapping[lowerKey] || iconMapping[key];
  
  if (!iconName) {
    console.warn(`Иконка не найдена для ключа: ${key}. Используем логотип.`);
    return "icon-Logo"; 
  }
  
  return iconName;
}


export const iconPaths = {
  heart: "#icon-heart",
  star: "#icon-star",
  mapPin: "#icon-Logo",
  tv: "#icon-tv",
  shower: "#icon-shower",
  fuelPump: "#icon-fuel-pump",
  diagram: "#icon-diagram",
  microwave: "#icon-microwave",
  fridge: "#icon-fridge",
  boomBox: "#icon-boom-box", 
};