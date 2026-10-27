/* REBORN: HUNTER'S FATE — bundled geography profiles.
 * Coordinates are intentionally omitted unless a verified dataset is bundled.
 * These are scene-design profiles, not authoritative geographic claims.
 */
(()=>{'use strict';
const countryProfiles={
'Thailand':{climate:'tropical-monsoon',vegetation:'tropical',architecture:'thai-urban',weather:['humid','cloudy','rain'],season:['hot','rainy','cool'],terrain:'plains'},
'Indonesia':{climate:'tropical-equatorial',vegetation:'tropical',architecture:'tropical-urban',weather:['humid','cloudy','rain'],season:['wet','dry'],terrain:'plains'},
'Philippines':{climate:'tropical-monsoon',vegetation:'tropical',architecture:'coastal-tropical',weather:['humid','cloudy','rain'],season:['dry','wet'],terrain:'coast'},
'Japan':{climate:'temperate-humid',vegetation:'temperate',architecture:'japanese-urban',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'China':{climate:'varied',vegetation:'temperate',architecture:'east-asian-urban',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'India':{climate:'varied-monsoon',vegetation:'subtropical',architecture:'south-asian-urban',weather:['hot','humid','rain'],season:['hot','monsoon','cool'],terrain:'plains'},
'United States':{climate:'varied',vegetation:'temperate',architecture:'north-american-urban',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'Brazil':{climate:'tropical-subtropical',vegetation:'tropical',architecture:'latin-urban',weather:['warm','humid','rain'],season:['wet','dry'],terrain:'plains'},
'Germany':{climate:'temperate-oceanic',vegetation:'temperate',architecture:'central-european',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'France':{climate:'temperate',vegetation:'temperate',architecture:'western-european',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'United Kingdom':{climate:'temperate-oceanic',vegetation:'temperate',architecture:'british-urban',weather:['cloudy','rain','clear'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'Canada':{climate:'cold-temperate',vegetation:'boreal-temperate',architecture:'north-american-urban',weather:['clear','cloudy','snow'],season:['spring','summer','autumn','winter'],terrain:'forest'},
'Russia':{climate:'continental-cold',vegetation:'boreal',architecture:'eastern-european',weather:['cloudy','snow','clear'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'Australia':{climate:'varied-dry-temperate',vegetation:'dry-temperate',architecture:'australian-urban',weather:['clear','cloudy','rain'],season:['summer','autumn','winter','spring'],terrain:'plains'},
'New Zealand':{climate:'temperate-oceanic',vegetation:'temperate',architecture:'oceanic-settlement',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'coast'},
'Norway':{climate:'cold-oceanic',vegetation:'boreal',architecture:'nordic',weather:['cloudy','rain','snow'],season:['spring','summer','autumn','winter'],terrain:'mountains'},
'Sweden':{climate:'cold-temperate',vegetation:'boreal',architecture:'nordic',weather:['clear','cloudy','snow'],season:['spring','summer','autumn','winter'],terrain:'forest'},
'Kenya':{climate:'tropical-highland-varied',vegetation:'savanna',architecture:'east-african-urban',weather:['warm','cloudy','rain'],season:['dry','wet'],terrain:'plains'},
'Nigeria':{climate:'tropical',vegetation:'tropical',architecture:'west-african-urban',weather:['hot','humid','rain'],season:['dry','wet'],terrain:'plains'},
'South Africa':{climate:'varied-subtropical',vegetation:'savanna',architecture:'southern-african-urban',weather:['clear','cloudy','rain'],season:['summer','autumn','winter','spring'],terrain:'plains'},
'Mexico':{climate:'varied-subtropical',vegetation:'dry-subtropical',architecture:'latin-urban',weather:['clear','warm','rain'],season:['dry','wet'],terrain:'plains'},
'Argentina':{climate:'temperate-varied',vegetation:'temperate',architecture:'latin-urban',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'},
'Pakistan':{climate:'dry-monsoon-varied',vegetation:'dry-subtropical',architecture:'south-asian-urban',weather:['hot','clear','rain'],season:['hot','monsoon','cool'],terrain:'plains'},
'Bangladesh':{climate:'tropical-monsoon',vegetation:'tropical-wetland',architecture:'south-asian-urban',weather:['humid','cloudy','rain'],season:['hot','monsoon','cool'],terrain:'wetlands'},
'Other countries (sampled)':{climate:'temperate-varied',vegetation:'mixed',architecture:'regional-settlement',weather:['clear','cloudy','rain'],season:['spring','summer','autumn','winter'],terrain:'plains'}
};
const coastal=/Mumbai|Chennai|Kolkata|Jakarta|Surabaya|Makassar|Manila|Cebu|Tokyo|Osaka|Shanghai|Guangzhou|New York|Los Angeles|Seattle|Miami|Rio de Janeiro|Sydney|Melbourne|Auckland|Lagos|Karachi|Chattogram|Cape Town|Marseille|Mumbai/i;
const mountain=/Kathmandu|Peshawar|Mekelle|Denver|Seattle|Vancouver|Chengdu|Mexico City|Addis Ababa|Goma|Nagano|Sapporo/i;
const rural=/Kano|Khulna|Ibadan|Bandung|Medan|Mekelle|Lubumbashi|Peshawar/i;
const wetland=/Dhaka|Khulna|Chattogram|Lagos/i;
function profile(country,city,settlementOverride){const base=countryProfiles[country]||countryProfiles['Other countries (sampled)'];const settlement=settlementOverride||(rural.test(city)?'rural':coastal.test(city)?'coastal-city':'urban');let terrain=wetland.test(city)?'wetlands':mountain.test(city)?'mountains':coastal.test(city)?'coast':rural.test(city)?'plains':base.terrain;return{id:'loc-'+slug(country)+'-'+slug(city),country,region:null,city,settlement,coordinates:null,elevationM:null,terrain,climate:base.climate,vegetation:base.vegetation,architecture:base.architecture,seasonalPattern:base.season,weatherOptions:base.weather,roadStyle:settlement==='urban'?'paved-street':settlement==='coastal-city'?'coastal-road':'dirt-path',waterway:terrain==='coast'||terrain==='wetlands',landmarks:[],cultureLabel:'local-context-simulated',dataStatus:'bundled-scene-profile',geographicFactsVerified:false,connections:[]}}
function slug(s){return String(s||'unknown').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function createBirthplace(country,city,context){const settlement=context&&/ชนบท/.test(context.urban||'')?'rural':undefined;const p=profile(country&&country.name||country,city,settlement);return{...p,initialHomeType:(context&&context.urban==='เขตเมือง')?'family-home-urban':p.settlement==='rural'?'family-home-rural':'family-home-regional',bornAt:{day:1,month:1,year:2026},history:[{type:'birth',locationId:p.id,city:p.city,country:p.country,day:1,month:1,year:2026,verifiedGeography:false}]}}
function sceneFor(loc,activity,age){const l=loc||profile('Other countries (sampled)','Unknown');return{locationId:l.id,city:l.city,country:l.country,settlement:l.settlement,terrain:l.terrain,climate:l.climate,vegetation:l.vegetation,architecture:l.architecture,season:(l.seasonalPattern||['temperate'])[Math.max(0,((activity&&activity.month||1)-1)%((l.seasonalPattern||['temperate']).length))],weather:(l.weatherOptions||['clear'])[((activity&&activity.day||1)+Math.max(0,age||0))%(l.weatherOptions||['clear']).length],activity:activity&&activity.job||'daily-life',age:age||0}}
window.RebornGeo={profile,createBirthplace,sceneFor,profiles:Object.keys(countryProfiles)};
})();