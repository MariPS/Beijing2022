from unittest import result
from fastapi import APIRouter
import server.database as db

router = APIRouter()


# @router.get("/", tags=["Root"])



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


@router.get("/medals", tags=["Medals"])
async def get_all_medals():
    medals = await db.retrieve_all_medals()
    if medals:
        return medals


@router.get("/events", tags=["Events"])
async def get_all_events():
    events = await db.retrieve_all_events()
    if events:
        return events