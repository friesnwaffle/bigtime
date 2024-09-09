import xml.etree.ElementTree as ET
from urllib.parse import quote

# List of main pages
main_pages = [
    "",
    "clock",
    "timer",
    "stopwatch",
    "pomodoro",
]

countries = [
    "afghanistan", "albania", "algeria", "andorra", "angola", "antigua-and-barbuda", "argentina", "armenia", 
    "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", 
    "belize", "benin", "bhutan", "bolivia", "bosnia-and-herzegovina", "botswana", "brazil", "brunei", "bulgaria", 
    "burkina-faso", "burundi", "cabo-verde", "cambodia", "cameroon", "canada", "central-african-republic", "chad", 
    "chile", "china", "colombia", "comoros", "congo", "congo-democratic-republic", "costa-rica", "croatia", 
    "cuba", "cyprus", "czech-republic", "denmark", "djibouti", "dominica", "dominican-republic", "east-timor", 
    "ecuador", "egypt", "el-salvador", "equatorial-guinea", "eritrea", "estonia", "eswatini", "ethiopia", 
    "fiji", "finland", "france", "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada", "guatemala", 
    "guinea", "guinea-bissau", "guyana", "haiti", "honduras", "hungary", "iceland", "india", "indonesia", "iran", 
    "iraq", "ireland", "israel", "italy", "ivory-coast", "jamaica", "japan", "jordan", "kazakhstan", "kenya", 
    "kiribati", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", 
    "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", 
    "marshall-islands", "mauritania", "mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", 
    "montenegro", "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", "new-zealand", 
    "nicaragua", "niger", "nigeria", "north-korea", "north-macedonia", "norway", "oman", "pakistan", "palau", 
    "palestine", "panama", "papua-new-guinea", "paraguay", "peru", "philippines", "poland", "portugal", "qatar", 
    "romania", "russia", "rwanda", "saint-kitts-and-nevis", "saint-lucia", "saint-vincent-and-the-grenadines", 
    "samoa", "san-marino", "sao-tome-and-principe", "saudi-arabia", "senegal", "serbia", "seychelles", "sierra-leone", 
    "singapore", "slovakia", "slovenia", "solomon-islands", "somalia", "south-africa", "south-korea", "south-sudan", 
    "spain", "sri-lanka", "sudan", "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", 
    "thailand", "togo", "tonga", "trinidad-and-tobago", "tunisia", "turkey", "turkmenistan", "tuvalu", "uganda", 
    "ukraine", "united-arab-emirates", "united-kingdom", "united-states", "uruguay", "uzbekistan", "vanuatu", 
    "vatican-city", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
]

# Lists of cities categorized by tiers
tier_1_cities = [
    "new-york", "los-angeles", "chicago", "houston", "miami", "toronto", 
    "london", "paris", "berlin", "madrid", "rome", "milan", 
    "tokyo", "osaka", "beijing", "shanghai", "hong-kong", "singapore", 
    "delhi", "mumbai", "bangalore", "kolkata", "chennai", "hyderabad",
    "sydney", "melbourne", "brisbane", "perth", "auckland", "wellington",
    "dubai", "abu-dhabi", "riyadh", "jeddah", "doha", "manama",
    "moscow", "saint-petersburg", "kiev", "minsk", "warsaw", "budapest",
    "cairo", "johannesburg", "cape-town", "nairobi", "lagos", "accra",
    "mexico-city", "sao-paulo", "buenos-aires", "bogota", "lima", "santiago"
]

tier_2_cities = [
    "atlanta", "boston", "dallas", "san-francisco", "seattle", "denver", "philadelphia", 
    "vancouver", "montreal", "calgary", "ottawa", 
    "birmingham", "manchester", "glasgow", "liverpool", "leeds", 
    "lyon", "marseille", "nice", "toulouse", "lille", 
    "barcelona", "valencia", "seville", "bilbao", 
    "naples", "florence", "bologna", "turin", "genoa", 
    "osaka", "nagoya", "fukuoka", "sapporo", 
    "guangzhou", "shenzhen", "chengdu", "wuhan", 
    "jakarta", "bangkok", "ho-chi-minh-city", 
    "pune", "ahmedabad", "jaipur", "lucknow", 
    "adelaide", "canberra", "gold-coast", 
    "kuwait-city", "amman", "muscat", 
    "belgrade", "bucharest", "sofia", "zagreb", 
    "alexandria", "casablanca", "dakar", 
    "guadalajara", "monterrey", "porto-alegre", 
    "caracas", "quito", "medellin", 
    "sydney", "brisbane", "perth", "adelaide", 
    "auckland", "christchurch", "wellington"
]

tier_3_cities = [
    "san-antonio", "san-diego", "orlando", "cleveland", "cincinnati", 
    "detroit", "minneapolis", "phoenix", "tampa", "st-louis",
    "calgary", "edmonton", "winnipeg", "halifax", "queensland",
    "marseille", "bordeaux", "strasbourg", "grenoble", "nantes",
    "valencia", "zaragoza", "malaga", "murcia", "palma",
    "turin", "palermo", "bari", "catania", "verona",
    "kyoto", "hiroshima", "kobe", "sendai", "kawasaki",
    "tianjin", "nanjing", "hangzhou", "xian", "qingdao",
    "chiang-mai", "penang", "cebu", "surabaya", "bandung",
    "patna", "bhopal", "coimbatore", "visakhapatnam", "kanpur",
    "wellington", "christchurch", "townsville", "hobart", "geelong",
    "amman", "tashkent", "tbilisi", "yerevan", "beirut",
    "belgrade", "krakow", "gdansk", "sofia", "vilnius",
    "cape-town", "durban", "pretoria", "abidjan", "luanda",
    "medellin", "guayaquil", "asuncion", "montevideo", "lapaz"
]

# # List of rest of the cities (non-tiered)
# rest_of_the_cities = [
#     "city4", "city5", "city6", "city7", "city8"
# ]

# Priority values for each tier and rest of the cities
tier_priorities = {
    'tier_1': 0.7,
    'tier_2': 0.6,
    'tier_3': 0.5,
    'rest': 0.5,  # Priority for rest of the cities
    'default': 0.5
}

# Base URL of your website
base_url = "https://www.bigtime.pw/"

# Create the root element
urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

def add_url(loc, priority, changefreq="daily"):
    url = ET.SubElement(urlset, "url")
    ET.SubElement(url, "loc").text = loc
    ET.SubElement(url, "changefreq").text = changefreq
    ET.SubElement(url, "priority").text = str(priority)

# Add main pages
for page in main_pages:
    loc = base_url + page
    add_url(loc, priority=1.0 if page == "" else 0.8)

# Add country-specific pages
for country in countries:
    loc = base_url + "clock/" + quote(country).title()
    add_url(loc, priority=0.7)

# Add city-specific pages with different priorities based on the tier
for city in tier_1_cities:
    loc = base_url + "clock/" + quote(city).title()
    add_url(loc, priority=tier_priorities['tier_1'])

for city in tier_2_cities:
    loc = base_url + "clock/" + quote(city).title()
    add_url(loc, priority=tier_priorities['tier_2'])

for city in tier_3_cities:
    loc = base_url + "clock/" + quote(city).title()
    add_url(loc, priority=tier_priorities['tier_3'])

# # Add rest of the cities with a different priority
# for city in rest_of_the_cities:
#     loc = base_url + "clock/" + quote(city).title()
#     add_url(loc, priority=tier_priorities['rest'])

# Create the tree and write it to a file
tree = ET.ElementTree(urlset)
tree.write("sitemap.xml", encoding="utf-8", xml_declaration=True)

print("Sitemap generated successfully!")
