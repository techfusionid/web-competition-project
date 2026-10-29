
import { fetchCompetitions } from "@/app/actions/competitions";
async function main() {
  const data = await fetchCompetitions();
  const raw = data.filter((c) => /^\s*[{[]/.test(c.category));
  console.log("total", data.length, "rawJsonCategories", raw.length);
  console.log(data.slice(0, 8).map((c) => [c.title.slice(0, 28), c.category, c.format]));
}
main();
