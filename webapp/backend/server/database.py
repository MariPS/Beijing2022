from itertools import count
import motor.motor_asyncio

from server.models.MedalModel import MedalModel

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.Beijing2022

disciplines_collection = database.get_collection("disciplines")
rankings_collection = database.get_collection("rankings")
results_collection = database.get_collection("results")
events_collection = database.get_collection("events")


def medal_helper(medal) -> dict:
    return {
        "medal_type": str(medal["medal_type"]),
        "medal_date": medal["medal_date"],
        "athlete_short_name": medal["athlete_short_name"],
        "athlete_name": medal["athlete_name"],
        "athlete_sex": medal["sex"],
        "athlete_link": medal["athlete_link"],
        "event": medal["event"],
        "country": medal["country"],
        "country_code": medal["country_code"],
        "discipline": medal["discipline"],
        "discipline_code": medal["discipline_code"],
    }




# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Disciplines collection
#---------------------------------------------------- 

# Retrieve all disciplines documents
async def retrieve_all_disciplines():
    documents = []
    async for document in disciplines_collection.find({},{"_id":0}):
        documents.append(document)
    return documents

# Retrieve discipline by name
async def retrieve_discipline_by_name(discipline: str):
    document = await disciplines_collection.find_one({"Discipline": discipline},{"_id":0})
    return document

# Retrieve disciplines' name list
async def retrieve_disciplines_names():
    disciplines_names = []
    async for document in disciplines_collection.find({},{"_id":0, "M":0, "F":0, "Total":0, "athletes":0}):
        disciplines_names.append(document["Discipline"])
    return disciplines_names

# Retrieve all countries for selected discipline
async def retrieve_countries_for_discipline(discipline: str):
    countries = []
    document = await disciplines_collection.find_one({"Discipline": discipline},{"_id":0,"athletes":1})
    for athlete in document["athletes"]:
        countries.append(athlete["country"])
    countries = set(countries)
    return countries


# Retrieve all athletes for selected country and discipline
async def retrieve_all_athletes_for_discipline_and_country(discipline: str, country : str):
    athletes = []
    document = await disciplines_collection.find_one({"Discipline": discipline},{"_id":0,"athletes":1})
    for athlete in document["athletes"]:
        if (athlete["country"]==country):
            athletes.append(athlete)
    return athletes





# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Rankings collection
#---------------------------------------------------- 

# Retrieve all rankings documents
async def retrieve_rankings():
    rankings = []
    async for ranking in rankings_collection.find({},{"_id":0}):
        rankings.append(ranking)
    return rankings


async def create_a_medal(medal: dict):
    ranking_doc = await rankings_collection.find_one({"Country": medal["country"]})
    updated_ranking_doc = False
    if ranking_doc:
        if medal["medal_type"] == "Gold":
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$push": {"gold_medals": medal } }
            )
        elif medal["medal_type"] == "Silver":
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$push": {"silver_medals": medal} }
            )
        elif medal["medal_type"] == "Bronze":
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$push": {"bronze_medals": medal} }
            )

    if updated_ranking_doc:
        newTotal = ranking_doc["Total"]+1
        await rankings_collection.update_one({"Country": medal["country"]},{"$set":{"Total":newTotal}})
        if medal["medal_type"] == "Gold":
            newGoldTotal = ranking_doc["Gold"] + 1
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$set": {"Gold": newGoldTotal } }
            )
        elif medal["medal_type"] == "Silver":
            newSilverTotal = ranking_doc["Silver"] + 1
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$set": {"Silver": newSilverTotal} }
            )
        elif medal["medal_type"] == "Bronze":
            newBronzeTotal = ranking_doc["Bronze"] + 1
            updated_ranking_doc = await rankings_collection.update_one(
                {"Country": medal["country"]},{"$set": {"Bronze": newBronzeTotal} }
            )
        return True
    return False
    

# Retrieve all results
async def retrieve_all_results():
    results = []
    async for result in results_collection.find({},{"_id":0}):
        results.append(result)
    return results








# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Events collection
#---------------------------------------------------- 

# Retrieve all events
async def retrieve_all_events():
    events = []
    async for event in events_collection.find({},{"_id":0}):
        events.append(event)
    return events

# Retrieve all events for discipline
async def retrieve_all_events_for_discipline(disciplineName: str):
    events = []
    async for document in events_collection.find({"discipline":disciplineName},{"_id":0}):
        events.append(document)
    return events