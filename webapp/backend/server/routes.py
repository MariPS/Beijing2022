from asyncio import events
from unittest import result
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from server.models.MedalModel import MedalModel, UpdateMedalModel
import server.database as db

router = APIRouter()


# @router.get("/", tags=["Root"])

# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Disciplines collection
#---------------------------------------------------- 

@router.get("/disciplines", tags=["Disciplines"])
async def get_all_disciplines():
    disciplines = await db.retrieve_all_disciplines()
    if disciplines:
        return disciplines

@router.get("/disciplines/names", tags=["Disciplines"])
async def get_disciplines_names():
    disciplines = await db.retrieve_disciplines_names()
    if disciplines:
        return disciplines

@router.get("/disciplines/{disciplineName}", tags=["Disciplines"])
async def get_discipline_by_name(disciplineName : str):
    discipline = await db.retrieve_discipline_by_name(disciplineName)
    if discipline:
        return discipline

@router.get("/discipline-countries/{disciplineName}", tags=["Disciplines"])
async def get_countries_for_discipline(disciplineName : str):
    countries = await db.retrieve_countries_for_discipline(disciplineName)
    if countries:
        return countries


@router.get("/athletes/{disciplineName}/{countryName}")
async def get_athletes_for_discipline_and_country(disciplineName:str, countryName: str):
    athletes = await db.retrieve_all_athletes_for_discipline_and_country(disciplineName,countryName)
    if athletes:
        return athletes




# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Rankings collection
#---------------------------------------------------- 

@router.get("/rankings", tags=["Rankings"])
async def get_all_rankings():
    rankings = await db.retrieve_rankings()
    if rankings:
        return rankings

@router.post("/rankings", tags=["Rankings"])
async def create_a_medal(medal: MedalModel = Body(...)):
    medal = jsonable_encoder(medal)
    medal_created = False
    medal_created = await db.create_a_medal(medal)
    return medal_created 

# @router.put("/rankings", tags=["Rankings"])
# async def update_a_medal(medal: UpdateMedalModel = Body(...)):
#     medal = jsonable_encoder(medal)
#     medal_updated = False
#     medal_updated = await db.update_a_medal(medal)
#     return medal_updated






# ///////////////////////////////////////////////////
# ---------------------------------------------------
#       Events collection
#---------------------------------------------------- 

@router.get("/events", tags=["Events"])
async def get_all_events():
    events = await db.retrieve_all_events()
    if events:
        return events


@router.get("/events/discipline={disciplineName}", tags=["Events"])
async def get_all_events_for_discipline(disciplineName: str):
    events = await db.retrieve_all_events_for_discipline(disciplineName)
    if events:
        return events