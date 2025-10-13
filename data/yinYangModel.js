import moment from "moment";

// 10 troncs célestes (éléments + Yin/Yang)
const troncsCelestes = [
  { element: "Bois", yinYang: "Yang" },
  { element: "Bois", yinYang: "Yin" },
  { element: "Feu", yinYang: "Yang" },
  { element: "Feu", yinYang: "Yin" },
  { element: "Terre", yinYang: "Yang" },
  { element: "Terre", yinYang: "Yin" },
  { element: "Métal", yinYang: "Yang" },
  { element: "Métal", yinYang: "Yin" },
  { element: "Eau", yinYang: "Yang" },
  { element: "Eau", yinYang: "Yin" }
];

// 12 animaux du zodiaque chinois
const animauxZodiaque = [
  "Rat", "Bœuf", "Tigre", "Lapin", "Dragon", "Serpent",
  "Cheval", "Chèvre", "Singe", "Coq", "Chien", "Cochon"
];

/**
 * Retourne l’animal du zodiaque selon l’année
 */
function getZodiaque(year) {
  return animauxZodiaque[(year - 4) % 12];
}

/**
 * Retourne le chemin de l'image selon l'élément et le Yin/Yang
 */
function getImagePath(element, yinYang) {
  if (element === "Bois" && yinYang === "Yang") return "/images/1-bois-yang-0000.jpg";
  if (element === "Bois" && yinYang === "Yin") return "/images/2-bois-yin-074.jpg";
  if (element === "Feu" && yinYang === "Yang") return "/images/3-feu-yang-083.jpg";
  if (element === "Feu" && yinYang === "Yin") return "/images/4-feu-yin-005.jpg";
  if (element === "Terre" && yinYang === "Yang") return "/images/5-terre-yang-013.jpg";
  if (element === "Terre" && yinYang === "Yin") return "/images/6-terre-yin-051.jpg";
  if (element === "Métal" && yinYang === "Yang") return "/images/7-metal-yang-065.jpg";
  if (element === "Métal" && yinYang === "Yin") return "/images/8-metal-yin-59.jpg";
  if (element === "Eau" && yinYang === "Yang") return "/images/9-eau-metal-065.jpg";
  if (element === "Eau" && yinYang === "Yin") return "/images/10-eau-yin-066.jpg";
  return "";
}

/**
 * Analyse Yin/Yang + élément + zodiaque
 */
export function getYinYangAnalysis(birthDate, birthTime, birthPlace, targetDate) {
  const birth = moment(`${birthDate} ${birthTime}`, "YYYY-MM-DD HH:mm");
  const target = moment(targetDate, "YYYY-MM-DD");

  if (!birth.isValid() || !target.isValid()) {
    return { error: "Les dates fournies ne sont pas valides." };
  }

  const diffDays = target.diff(birth, "days");

  // Tronc céleste du jour
  const indexTronc = diffDays % 10;
  const tronc = troncsCelestes[indexTronc];

  // Animal du zodiaque
  const animal = getZodiaque(birth.year());

  // Interprétation et conseils selon élément + Yin/Yang
  let interpretation = "";
  let conseils = [];
  let image = getImagePath(tronc.element, tronc.yinYang);

  switch (tronc.element) {
    case "Bois":
      interpretation = tronc.yinYang === "Yang"
        ? "Bois Yang : énergie expansive et créative, favorable pour initier de nouveaux projets."
        : "Bois Yin : période d'introspection et de patience, idéal pour réfléchir avant d'agir.";
      conseils = tronc.yinYang === "Yang"
        ? ["Lancez de nouvelles idées.", "Soyez créatif et audacieux.", "Planifiez sur le long terme."]
        : ["Prenez du recul avant d'agir.", "Réfléchissez à vos projets.", "Favorisez la méditation et la contemplation."];
      break;
    case "Feu":
      interpretation = tronc.yinYang === "Yang"
        ? "Feu Yang : énergie vive et communicative, période d'action et de dynamisme."
        : "Feu Yin : énergie douce et chaleureuse, propice aux échanges et à l'écoute.";
      conseils = tronc.yinYang === "Yang"
        ? ["Exprimez-vous avec confiance.", "Passez à l'action rapidement.", "Partagez vos idées."]
        : ["Écoutez activement les autres.", "Privilégiez la réflexion calme.", "Canalisez votre énergie avec prudence."];
      break;
    case "Terre":
      interpretation = tronc.yinYang === "Yang"
        ? "Terre Yang : stabilité et concrétisation, période favorable pour organiser et structurer."
        : "Terre Yin : introspection et réflexion sur vos fondations et relations.";
      conseils = tronc.yinYang === "Yang"
        ? ["Organisez vos tâches.", "Consolidez vos acquis.", "Soyez pragmatique et efficace."]
        : ["Évaluez vos priorités.", "Renforcez votre stabilité intérieure.", "Faites le point sur vos relations."];
      break;
    case "Métal":
      interpretation = tronc.yinYang === "Yang"
        ? "Métal Yang : force, détermination et clarté mentale, période d'affirmation et de décisions."
        : "Métal Yin : purification et introspection, favorable pour trier vos idées et émotions.";
      conseils = tronc.yinYang === "Yang"
        ? ["Prenez des décisions claires.", "Affirmez vos choix.", "Soyez persévérant et méthodique."]
        : ["Purifiez vos pensées.", "Prenez du recul sur vos émotions.", "Soyez introspectif et organisé."];
      break;
    case "Eau":
      interpretation = tronc.yinYang === "Yang"
        ? "Eau Yang : énergie fluide et adaptable, favorable aux mouvements et échanges."
        : "Eau Yin : calme, intuition et introspection renforcée.";
      conseils = tronc.yinYang === "Yang"
        ? ["Soyez flexible et adaptable.", "Communiquez vos idées.", "Profitez de l'élan pour avancer."]
        : ["Écoutez votre intuition.", "Prenez le temps de méditer.", "Agissez avec prudence et calme."];
      break;
  }

  return {
    birthDate,
    birthTime,
    birthPlace,
    targetDate,
    diffDays,
    element: tronc.element,
    energy: tronc.yinYang,
    zodiaque: animal,
    interpretation,
    conseils,
    image // Ajout de l'image au résultat
  };
}
