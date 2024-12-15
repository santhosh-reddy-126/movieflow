import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../image/mvbg.jpg";
import "../css/Specific.css";
const blink = "http://localhost:3144";
export default function Specific() {
  const location = useLocation();
  const id = location.state.id || 0;
  const [item, setItem] = useState({});
  const getMovie = async () => {
    try {
      const data1 = await fetch(blink + "/api/getSpecific", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const resp = await data1.json();

      if (resp.success) {
        setItem(resp.data);
      } else {
        alert(resp.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const languageMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    zh: "Chinese",
    hi: "Hindi",
    ar: "Arabic",
    pt: "Portuguese",
    ru: "Russian",
    ko: "Korean",
    tr: "Turkish",
    pl: "Polish",
    sv: "Swedish",
    nl: "Dutch",
    fi: "Finnish",
    da: "Danish",
    no: "Norwegian",
    th: "Thai",
    el: "Greek",
    he: "Hebrew",
    cs: "Czech",
    hu: "Hungarian",
    ro: "Romanian",
    uk: "Ukrainian",
    ta: "Tamil",
    te: "Telugu",
    ml: "Malayalam",
    bn: "Bengali",
    kn: "Kannada",
    mr: "Marathi",
    vi: "Vietnamese",
    id: "Indonesian",
    ms: "Malay",
    fa: "Persian",
    sr: "Serbian",
    hr: "Croatian",
    sk: "Slovak",
    sl: "Slovenian",
    bg: "Bulgarian",
    lt: "Lithuanian",
    lv: "Latvian",
    et: "Estonian",
  };

  const countryMap = {
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    IN: "India",
    JP: "Japan",
    KR: "South Korea",
    FR: "France",
    DE: "Germany",
    IT: "Italy",
    ES: "Spain",
    RU: "Russia",
    CN: "China",
    BR: "Brazil",
    MX: "Mexico",
    AR: "Argentina",
    ZA: "South Africa",
    SE: "Sweden",
    NL: "Netherlands",
    TR: "Turkey",
    TH: "Thailand",
    PL: "Poland",
    ID: "Indonesia",
    PH: "Philippines",
    VN: "Vietnam",
    MY: "Malaysia",
    SA: "Saudi Arabia",
    AE: "United Arab Emirates",
    EG: "Egypt",
    NG: "Nigeria",
    PK: "Pakistan",
    BD: "Bangladesh",
    IR: "Iran",
    GR: "Greece",
    IL: "Israel",
    PT: "Portugal",
    DK: "Denmark",
    FI: "Finland",
    NO: "Norway",
    IE: "Ireland",
    CH: "Switzerland",
    AT: "Austria",
    BE: "Belgium",
    HU: "Hungary",
    CZ: "Czech Republic",
    RO: "Romania",
    BG: "Bulgaria",
    UA: "Ukraine",
    SK: "Slovakia",
    HR: "Croatia",
    SI: "Slovenia",
    NZ: "New Zealand",
    SG: "Singapore",
    HK: "Hong Kong",
    TW: "Taiwan",
    CL: "Chile",
    PE: "Peru",
    CO: "Colombia",
    VE: "Venezuela",
    UY: "Uruguay",
    BO: "Bolivia",
    CR: "Costa Rica",
    CU: "Cuba",
    DO: "Dominican Republic",
    GT: "Guatemala",
    HN: "Honduras",
    SV: "El Salvador",
    NI: "Nicaragua",
    PY: "Paraguay",
    EC: "Ecuador",
    PR: "Puerto Rico",
    KE: "Kenya",
    GH: "Ghana",
    TZ: "Tanzania",
    UG: "Uganda",
    ZW: "Zimbabwe",
    SD: "Sudan",
    DZ: "Algeria",
    MA: "Morocco",
    TN: "Tunisia",
    LY: "Libya",
    QA: "Qatar",
    KW: "Kuwait",
    BH: "Bahrain",
    OM: "Oman",
    IQ: "Iraq",
    SY: "Syria",
    YE: "Yemen",
    LB: "Lebanon",
    CY: "Cyprus",
    MT: "Malta",
    IS: "Iceland",
    LU: "Luxembourg",
    LI: "Liechtenstein",
    MC: "Monaco",
    SM: "San Marino",
    VA: "Vatican City",
  };

  return (
    <div>
      {Object.keys(item).length != 0 ? (
        <div
          style={{
            background: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vh",
          }}
        >
          <div className="head">
            <div>
            <img
              src={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/original" + item.poster_path
                  : img
              }
            />
            <div className="det">
              <h1>{item.title}({new Date(item.release_date).getFullYear()
                  ? new Date(item.release_date).getFullYear()
                  : ""})</h1>
              <h2>{languageMap[item.original_language]}</h2>
              <h2>{countryMap[item.origin_country[0]]}</h2>
              <h2>
                {Math.floor(item.runtime / 60)}hr {item.runtime % 60}min
              </h2>
              <div className="genres">
                {item.genres
                  ? item.genres.map((items) => (
                      <p id="genreUnit">{items.name || "Unknown"}</p>
                    ))
                  : ""}
              </div>
            </div>
            </div>
            <div className='prod'>
                {item.production_companies.slice(0,2).map(k => <div>
                  <img id="prod_img" src={k.logo_path ? "https://image.tmdb.org/t/p/original"+k.logo_path:img} />
                  <p>{k.name}</p>
                </div>)}
              </div>
          </div>
          <div className="body">
            <div className="Story">
              <p>{item.overview}</p>
            </div>
            
            
            <div className='info'>
                <p><span>Release Date</span><br/>{new Date(item.release_date).getDate()} {new Date(item.release_date).toLocaleString('en-US', { month: 'short' })},{new Date(item.release_date).getFullYear()}</p>
                <p><span>Budget</span><br/>${(item.budget/1000000).toFixed(1)}M</p>
                <p><span>Revenue</span><br/>${(item.revenue/1000000).toFixed(1)}M</p>
                <p><span>TMDB Rating</span><br/>{item.vote_average}({item.vote_count} Ratings)</p>
              </div>

              <div className='rate'>
                <h1>Rate</h1>
                <div>
                  <button className="btn1">1 ⭐</button>
                <button className="btn1">2 ⭐</button>
                <button className="btn1">3 ⭐</button>
                <button className="btn1">4 ⭐</button>
                <button className="btn1">5 ⭐</button>
                </div>
                
                <p>0 ⭐</p>
              </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
