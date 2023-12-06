import { SubItem } from "../services/item";
import { getSubitemMonths, SubitemMonth } from "../services/subitem";

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 
  'Mayo', 'Junio', 'Julio', 'Agosto', 
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];


export const toTrimesterMap = (subitemMonths: SubitemMonth[]) => {
  let timeSpace = 3;
  const totalSections = 12 / timeSpace;
  const obj: Record<string, SubitemMonth[]> = {};
  let start = 0;
  for (let idx = 0; idx < totalSections; idx++) {
    obj[idx + 1] = subitemMonths.slice(start, timeSpace * (idx + 1));
    start += timeSpace;
  }
  return obj;
}

export const computeTotal = (months: SubitemMonth[]) => {
  let [totalExecuted, totalProjected, totalBudget] = [0, 0, 0];

  for(let i = 0; i < months.length; i++) {
    totalExecuted += months[i].executedBudget;
    totalProjected += months[i].projectedBudget;
    totalBudget += months[i].budget;
  }
  return {
    totalExecuted,
    totalProjected,
    totalBudget
  };
}

export const getMonth = (date: Date) => {
  const monthNumber = new Date(date).getUTCMonth();
  return months[monthNumber];
}

export const capitalize = (itemName: string) => {
  return itemName.trim()
    .split("-")
    .map(word => {
      if (word.length < 3) return word; 
      else return word.charAt(0).toUpperCase() + word.substring(1, word.length)
    })
    .join(" ");
}

export async function getAllSubitemsMonths(subitems: SubItem[]) {
  const reqs = [];
  for(let i=0; i < subitems.length; i++) {
    const subitem = subitems[i];
    reqs.push(getSubitemMonths(+subitem.id));
  }
  const allMonths = await Promise.all(reqs);
  return allMonths.map(res => res.data);
}

export function groupMonths<T>(months: T[], dividingTime = 3): Array<T[]> {
  const monthsGrouped = [];
  let acc = [];
  for (let i = 0; i < months.length; i++) {
    const item = months[i];
    acc.push(item);

    if ((i+1) % dividingTime == 0) {
      monthsGrouped.push([...acc]);
      acc = [];
    }
    
  }
  return monthsGrouped;
}
