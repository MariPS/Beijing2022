import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.Beijing2022

disciplines_collection = database.get_collection("disciplines")
medals_collection = database.get_collection("medals")
results_collection = database.get_collection("results")
events_collection = database.get_collection("events")


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



# Retrieve all medals documents
async def retrieve_all_medals():
    medals = []
    async for medal in medals_collection.find({},{"_id":0}):
        medals.append(medal)
    return medals

# Retrieve all results
async def retrieve_all_results():
    results = []
    async for result in results_collection.find({},{"_id":0}):
        results.append(result)
    return results

# Retrieve all events
async def retrieve_all_events():
    events = []
    async for event in events_collection.find({},{"_id":0}):
        events.append(event)
    return events