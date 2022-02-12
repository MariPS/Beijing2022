from fastapi import APIRouter
import server.database as db

router = APIRouter()


@router.get("/", tags=["Root"])
async def read_root():
    disciplines = await db.retrieve_all_disciplines()
    return disciplines


@router.get("/disciplines")
async def get_all_disciplines():
    disciplines = await db.retrieve_all_disciplines()
    if disciplines:
        return disciplines

@router.get("/medals")
async def get_all_medals():
    medals = await db.retrieve_all_medals()
    if medals:
        return medals

@router.get("/disciplines/{disciplineName}", tags=["Disciplines"])
async def get_discipline_by_name(disciplineName : str):
    discipline = await db.retrieve_discipline_by_name(disciplineName)
    if discipline:
        return discipline