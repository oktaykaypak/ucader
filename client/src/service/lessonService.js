const axios = require('axios')
const url = 'http://localhost:5000/api/lesson/';

class lessonService {


    static getDataLessons() {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}`, {});
                const data = res.data;
                resolve(
                    data.map(lesson => ({
                        ...lesson
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    static getData(lessonId) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}${lessonId}`, {});
                const data = res.data;
                resolve(
                    data.map(lesson => ({
                        ...lesson
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }
    static addLesson() {
        return axios.post(`${url}addLesson`, {

        });
    }
    static addPhoto(idP, img_url) {
        return axios.post(`${url}photo`, {
            id: idP,
            img_url: img_url,
        });
    }
    static addLessonData(idLD, title, desc) {
        return axios.post(`${url}lessonData`, {
            id: idLD,
            title: title,
            desc: desc
        });
    }
    static addLessonPage(idPD, pageData, pageName) {
        return axios.post(`${url}pageData`, {
            id: idPD,
            pageData: pageData,
            pageName: pageName
        });
    }
    static deleteLesson(id) {
        return axios.delete(`${url}`, {
            params: {
                id: id,
            }
        });
    }

    static editLessonPage(id, pageId, editorData, pageName) {
        return axios.post(`${url}editLessonPage`, {

            id: id,
            pageId: pageId,
            editorData: editorData,
            pageName: pageName
        });
    }

}
export default lessonService;