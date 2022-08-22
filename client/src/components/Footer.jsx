import { useState, useEffect } from "react";

function Footer() {

    var [articles, setArticles] = useState({ articles: [] });

    useEffect(
        () => {
            const f = async () => {
                const data = await fetch(`/getFooterArticles`)
                const jsonData = await data.json()
                setArticles(jsonData)
            }
            f();
        }, [])


    articles.articles.forEach(article => {

        let postDateRaw = article.date.split('T');
        let postDateParsed = postDateRaw[0].split('-');
        let postYear = postDateParsed[0]
        let postMonth = postDateParsed[1]
        let postDate = postDateParsed[2]


        article.dateComplete = `${postMonth}/${postDate}/${postYear} `

        article.link = `/articles/${article.id}`
    })

    return (
        <footer className="bg-blue-500 text-center rounded-t">
            <div className="text-sm row text-center mx-auto mb-0 md:flex">
                <div className="text-center md:w-1/3 p-7">
                    <h2 className="text-3xl font-bold">Class Times</h2>
                    <table className="mx-auto text-sm text-left text-gray-800 dark:text-gray-900">
                        <tbody>
                            <tr className="row">
                                <td className="px-6 py-1 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Tilawat ud Dua
                                </td>
                                <td className="font-mono">
                                    09:30am - 10:00am
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6 py-1 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 1
                                </td>
                                <td className="font-mono">
                                    10:00am - 10:30am
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6 py-1 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 2
                                </td>
                                <td className="font-mono">
                                    10:30am - 11:00am
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 3
                                </td>
                                <td className="font-mono">
                                    11:15am - 11:30am
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6 py-1 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Break
                                </td>
                                <td className="font-mono">
                                    11:30am - 11:45am
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 4
                                </td>
                                <td className="font-mono">
                                    11:45am - 12:15pm
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 5
                                </td>
                                <td className="font-mono">
                                    12:15pm - 12:45pm
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Block 6
                                </td>
                                <td className="font-mono">
                                    12:45pm - 1:30pm
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Namaaz/Lunch
                                </td>
                                <td className="font-mono">
                                    1:30pm - 2:30pm
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="px-6  text-center py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Tarbiyat Barnamaj
                                </td>
                                <td className="font-mono">
                                    2:30pm - 3:00pm
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center  md:w-1/3 p-7">
                    <h2 className="text-3xl font-bold">Latest News</h2>
                    {articles.articles.slice(0, 5).map(article => {
                        return (<p key={article.id} className="py-1"><i>{article.dateComplete}</i> - <a href={article.link} className='text-slate-700'>{article.title}</a></p>)
                    })}
                    <br />
                    <a href="/articles" className="bg-transparent mx-1 hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Read News</a>
                    <br />
                </div>
                <div className="text-center md:w-1/3 p-7">
                    <h2 className="text-3xl font-bold">Contact Us</h2>
                    <address>
                        15 84 Ave<br />
                        Surrey, B.C.<br />
                        V3W 4G3, Canada<br /><br />
                        <a href="tel:7782312152" className="bg-transparent  mx-1 hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Call</a> | <a href="mailto:shabz2002786@gmail.com" className="bg-transparent  mx-1 hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Email</a><br />
                    </address>
                </div>
            </div>
            <br />
            <div className="mt-0">
                <div>
                    <p>
                        &#xa9; Copyright Madrasah Jamaliyah | Vancouver</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
