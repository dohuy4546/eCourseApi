import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native"
import MyStyles from "../../styles/MyStyles"
import React from "react";
import { Chip, List, Searchbar } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";


const Course = () => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");
    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadCates();
    }, [])

    const loadCourses = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}`
            let res = await APIs.get(url);
            console.log(res.data.results)
            setCourses(res.data.results);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId])

    return (
        <View style={MyStyles.container}>
            <Text>Course</Text>
            <View style={MyStyles.row}>
                <Chip mode={!cateId?"outlined":"flat"} style={MyStyles.margin} onPress={() => setCateId("")} icon="shape-plus">Tất cả</Chip>
                {categories === null ? <ActivityIndicator /> : <>
                    {categories.map(c => <Chip mode={c.id==cateId?"outlined":"flat"} style={MyStyles.margin} key={c.id} onPress={() => setCateId(c.id)} icon="tag">{c.name}</Chip>)}
                </>}
            </View>
            <View>
                <Searchbar placeholder="Nhập từ khóa..." onChangeText={setQ} value={q} />
            </View>
            <ScrollView>
                {loading && <ActivityIndicator />}
                {courses.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.subject} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} 
                                    description={moment(c.created_date).fromNow()}/>} />)}
            </ScrollView>
        </View>
    )
}

export default Course;