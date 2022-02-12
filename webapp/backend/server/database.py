import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.Beijing2022

disciplines_collection = database.get_collection("disciplines")
medals_collection = database.get_collection("medals")
results_collection = database.get_collection("results")

# Retrieve all disciplines documents
async def retrieve_all_disciplines():
    documents = []
    async for document in disciplines_collection.find({},{"_id":0}):
        documents.append(document)
    return documents

# Retrieve discipline by name
async def retrieve_discipline_by_name(discipline):
    document = await disciplines_collection.find_one({"Discipline": discipline},{"_id":0})
    return document

# Retrieve all medals documents
async def retrieve_all_medals():
    medals = []
    async for medal in medals_collection.find({},{"_id":0}):
        medals.append(medal)
    return medals