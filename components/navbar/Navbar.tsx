import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AlbumCard from "../albumCard/AlbumCard";
import ArtistCard from "../artistCard/ArtistCard";
import PlaylistCard from "../playlistCard/PlaylistCard";
import SongCard from "../songCard/SongCard";
import TopQueryCard from "../topQueryCard/TopQueryCard";

interface GlobalSearchProps {
    "success": true,
    "data": {
        "albums": {
            "results": [
                {
                    "id": "string",
                    "title": "string",
                    "image": [
                        {
                            "quality": "string",
                            "url": "string"
                        }
                    ],
                    "artist": "string",
                    "url": "string",
                    "type": "string",
                    "description": "string",
                    "year": "string",
                    "language": "string",
                    "songIds": "string"
                }
            ],
            "position": 1
        },
        "songs": {
            "results": [
                {
                    "id": "string",
                    "title": "string",
                    "image": [
                        {
                            "quality": "string",
                            "url": "string"
                        }
                    ],
                    "album": "string",
                    "url": "string",
                    "type": "string",
                    "description": "string",
                    "primaryArtists": "string",
                    "singers": "string",
                    "language": "string"
                }
            ],
            "position": 1
        },
        "artists": {
            "results": [
                {
                    "id": "string",
                    "title": "string",
                    "image": [
                        {
                            "quality": "string",
                            "url": "string"
                        }
                    ],
                    "type": "string",
                    "description": "string",
                    "position": 1
                }
            ],
            "position": 1
        },
        "playlists": {
            "results": [
                {
                    "id": "string",
                    "title": "string",
                    "image": [
                        {
                            "quality": "string",
                            "url": "string"
                        }
                    ],
                    "url": "string",
                    "language": "string",
                    "type": "string",
                    "description": "string"
                }
            ],
            "position": 1
        },
        "topQuery": {
            "results": [
                {
                    "id": "string",
                    "title": "string",
                    "image": [
                        {
                            "quality": "string",
                            "url": "string"
                        },
                        {
                            "quality": "string",
                            "url": "string"
                        },
                        {
                            "quality": "string",
                            "url": "string"
                        },
                    ],
                    "album": "string",
                    "url": "string",
                    "type": "string",
                    "description": "string",
                    "primaryArtists": "string",
                    "singers": "string",
                    "language": "string"
                }
            ],
            "position": 1
        }
    }
}

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<GlobalSearchProps | null>(null);

    useEffect(() => {
        if (!search) return; // don’t fetch on empty

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://saavn.dev/api/search?query=${search}`
                );
                const data: GlobalSearchProps = await res.json();
                setResults(data);
                console.log("response", data);
            } catch (err) {
                console.log("Error fetching:", err);
            }
        }, 500);

        return () => clearTimeout(timeout); // cleanup old timer
    }, [search]);

    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            <Text style={styles.logoName}>Musica</Text>

            <TextInput
                value={search}
                style={styles.textinput}
                onChangeText={(text) => setSearch(text)}
                placeholder="Search..."
                placeholderTextColor="grey"
            />

            {/* <Text style={{ color: "white", marginTop: 10 }}>
                {search ? `Searching: ${search}` : ""}
            </Text> */}

            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                {results?.data?.topQuery?.results?.[0] && (
                    <TopQueryCard data={results.data.topQuery.results[0]} />
                )}

                {results?.data?.songs?.results?.[0] && (
                    <SongCard data={results.data.songs.results} search={search}/>
                )}

                {results?.data?.albums?.results?.[0] && (
                    <AlbumCard data={results.data.albums.results} />
                )}

                {results?.data?.artists?.results?.[0] && (
                    <ArtistCard data={results.data.artists.results} />
                )}

                {results?.data?.playlists?.results?.[0] && (
                    <PlaylistCard data={results.data.playlists.results} />
                )}

                {/* {results && (
                    <Text style={{ color: "white", marginTop: 20 }}>
                        {JSON.stringify(results, null, 2)}
                    </Text>
                )} */}


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    logoName: {
        color: "white",
        fontSize: 30,
        fontFamily: "serif",
        fontWeight: "bold",
        padding: 10,
        textAlign: "center",
        marginBottom: 20
    },
    textinput: {
        color: "white",
        fontSize: 20,
        fontFamily: "serif",
        padding: 10,
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#8682",
        marginBottom: 20,
    },
});

export default Navbar;
