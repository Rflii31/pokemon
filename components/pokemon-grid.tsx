"use client"
import { PokemonCard } from "./pokemon-card";
import { useEffect, useState, useRef } from "react"
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface PokemonGridProps {
    pokemonList: any
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
    // state
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(99);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // console.log(pokemonList);

    const searchFilter = (pokemonList: any) => {
        const filteredList = pokemonList.filter(
            (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );

        return [...filteredList, ...searchResult];
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    const searchPokemon = async (page: number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?name=${searchText}&page=${page}`);
        const data = await response.json();
        setSearchResult(data.results);

        // Menghitung total halaman
        const totalCount = data.totalCount;
        const pageSize = 100;
        const totalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(totalPages);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentPage]);

    const handleNextClick = () => {
        const nextPageNumber = currentPage + 1;
        setStartIndex(startIndex + 100);
        setEndIndex(endIndex + 100);
        setCurrentPage(nextPageNumber);
        searchPokemon(nextPageNumber);

        const newUrl = `/page=${nextPageNumber}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
    };

    const handlePreviousClick = () => {
        const previousPageNumber = currentPage - 1;
        setStartIndex(startIndex - 100);
        setEndIndex(endIndex - 100);
        setCurrentPage(previousPageNumber);
        searchPokemon(previousPageNumber);

        const newUrl = `/page=${previousPageNumber}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageNumber = parseInt(urlParams.get("page") || "1", 10);
        setCurrentPage(pageNumber);
    }, []);


    const filteredPokemonList = searchFilter(pokemonList).slice(startIndex, endIndex + 1);
    const showNoResult = searchText !== "" && filteredPokemonList.length === 0;

    const showNextButton = endIndex < pokemonList.length - 1;
    const showPreviousButton = startIndex > 0;


    return (
        <>
            <div>
                <h3 className="text-2xl py-6 text-center">Search For Your Pokemon!</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="pokemonName">Pokemon Name</label>
                    <input
                        ref={inputRef}
                        className="p-2 rounded-lg"
                        type="text"
                        value={searchText}
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="Bulbasaur, Pikachu, etc."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
            </div>

            <div className="flex justify-center">
                {showNoResult && searchResult.length === 0 && (
                    <p className="text-white text-lg">
                        The pokemon you are looking for doesn't exist.
                    </p>
                )}

                {showNoResult && searchResult.length > 0 && (
                    <p className="text-white text-lg">
                        The pokemon you are looking for is not in the initial list, but it exists in the API.
                    </p>
                )}
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
                {filteredPokemonList.map((pokemon: any) => {
                    return (
                        <PokemonCard name={pokemon.name} key={pokemon.name} />
                    )
                })}

                {searchResult.map((pokemon: any) => {
                    return (
                        <PokemonCard name={pokemon.name} key={pokemon.name} />
                    )
                })}
            </div>

            <div className="flex justify-center font-bold text-xl m-3">
                <p className="text-white">
                    {currentPage}
                </p>
            </div>

            <div className="flex justify-center mt-4">
                {showPreviousButton && (
                    <button
                        className="bg-transparent border-solid border border-gray-500 hover:bg-slate-900 text-white py-4 px-6 rounded mr-4"
                        onClick={handlePreviousClick}
                    >
                        Previous
                    </button>
                )}
                {showNextButton && (
                    <button
                        className="bg-transparent border-solid border border-gray-500 hover:bg-slate-900 text-white  py-4 px-6 rounded"
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                )}
            </div>
        </>
    )
}