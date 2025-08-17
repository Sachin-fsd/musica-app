import { Image, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface PlaylistCardProps {
    id: string;
    title: string;
    image: { quality: string; url: string }[];
    url: string;
    type: string;
    description: string;
    language: string;
}

const PlaylistCard = ({ data }: { data: PlaylistCardProps[] }) => {
    return (
        <View style={styles.container}>
            <ThemedText style={{ marginBottom: 5 }} type="title">Playlists</ThemedText>
            {data.map((song) => (
                <View key={song.id} style={styles.card}>
                    <View>
                        <Image
                            source={{ uri: song.image?.[2]?.url || song.image?.[0]?.url }}
                            style={styles.cover}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{song.title}</Text>
                        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.type}</Text>
                        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{song.description}</Text>
                    </View>
                </View>
            ))}
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
})

export default PlaylistCard;
