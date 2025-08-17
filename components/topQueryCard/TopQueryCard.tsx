import { Image, StyleSheet, Text, View } from "react-native";

export interface SongCardProps {
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

const TopQueryCard = ({ data }: { data: SongCardProps }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: data.image?.[2]?.url || data.image?.[0]?.url }}
                style={styles.cover}
            />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.primaryArtists}</Text>
            <Text style={styles.subtitle}>{data.album || data.description}</Text>
            <Text style={styles.subtitle}>{data.type}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        alignItems: "center",
    },
    cover: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        textAlign:"center"
    },
    subtitle: {
        color: "grey",
        fontSize: 14,
        width: "auto",
        textAlign: "center",
    },
});

export default TopQueryCard;
