import api, { Song } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface SongCardProps {
    id: string;
    title: string;
    image: { quality: string; url: string }[];
    album: string;
    url: string;
    type: string;
    description: string;
    primaryArtists: string;
    singers: string;
    language: string;
}

const SongCard = ({ data, search }: { data: SongCardProps[], search: string }) => {
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const limit = 20;

    // useEffect(() => {
    //     const searchSongs = async () => {
    //         if (!search) return;

    //         try {
    //             setLoading(true);
    //             const response = await api.searchSongs(search, page, limit);

    //             if (response.success) {
    //                 setSongs(response.data.results);
    //                 setTotalResults(response.data.total || 0);
    //             }
    //         } catch (error) {
    //             console.error('Error searching songs:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     const timeout = setTimeout(searchSongs, 500);
    //     return () => clearTimeout(timeout); // cleanup old timer
    // }, [search, page]);

    useEffect(() => {
        setPage(0);
        setSongs([]);
        setTotalResults(0);
    }, [search])

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
        const searchSongs = async () => {
            if (!search) return;

            try {
                setLoading(true);
                const response = await api.searchSongs(search, page, limit);

                if (response.success) {
                    setSongs(response.data.results);
                    setTotalResults(response.data.total || 0);
                }
            } catch (error) {
                console.error('Error searching songs:', error);
            } finally {
                setLoading(false);
            }
        };
        const timeout = setTimeout(searchSongs, 500);
        return () => clearTimeout(timeout);
    };

    return (
        <View style={styles.container}>
            <ThemedText>{page}</ThemedText>
            <ThemedText style={{ marginBottom: 5 }} type="title">Songs</ThemedText>
            {songs.length == 0 && data.map((song) => (
                <View key={song.id} style={styles.card}>
                    <View>
                        <Image
                            source={{ uri: song.image?.[1]?.url || song.image?.[0]?.url }}
                            style={styles.cover}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{song.title}</Text>
                        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.primaryArtists}</Text>
                        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.album || song.description}</Text>
                    </View>
                </View>
            ))}
            {
                songs.length && songs.map((song, index) => (
                    <View key={index}>
                        <View style={styles.card}>
                            <View>
                                <Image
                                    source={{ uri: song.image?.[2]?.url || song.image?.[0]?.url }}
                                    style={styles.cover}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "white", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{song.name}</Text>
                                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.artists.primary.map(artist => artist.name).join(",")}</Text>
                                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.album.name}</Text>
                            </View>
                        </View>
                    </View>
                ))
            }
            <TouchableHighlight style={styles.loadbutton}>
                <Button title={loading ? `Loading...` : "Load More"} onPress={handleLoadMore} />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    cover: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 10
    },
    card: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center"
    },
    subtitle: {
        color: "grey",
        fontSize: 14,
        width: "auto",
    },
    loadbutton: {
        borderRadius: 10,
    }
})

export default SongCard;
