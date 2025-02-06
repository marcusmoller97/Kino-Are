
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import sortScreenings  from "../../src/screenings.js";

describe("Tests that the sortScreenings function can handle different information from API", () =>{


    it("Should return an array with length 0 when none of the screenings are in the next 5 days", () =>{
        const date1 = new Date();
        date1.setDate(date1.getDate() +7);
        const date2 = new Date();
        date2.setDate(date2.getDate() +10);
        const date3 = new Date();
        date3.setDate(date3.getDate() -2);
        const date4 = new Date();
        date4.setDate(date4.getDate() +6);
        const fakeAPI = [{
            id: 111,
            start_time: date1.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 1,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 112,
            start_time: date2.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 2,
                    attributes: {
                        title: "Encant0",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 113,
            start_time: date3.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 3,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Pulp fiction",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                 }
                }
            }
        },
        {
            id: 114,
            start_time: date4.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        ];
        const array = sortScreenings(fakeAPI);
        expect(array).toHaveLength(0);

    });
    it("should return an array with the length 10 when there are more than 10 screenings in the coming 5 days", () =>{
        const date1 = new Date();
        date1.setDate(date1.getDate() +2);
        const date2 = new Date();
        date2.setDate(date2.getDate() +1);
        const date3 = new Date();
        date3.setDate(date3.getDate() +3);
        const date4 = new Date();
        date4.setDate(date4.getDate() +4);
        const date5 = new Date();
        date5.setDate(date5.getDate() +2);
        const date6 = new Date();
        date6.setDate(date6.getDate() +1);
        const date7 = new Date();
        date7.setDate(date7.getDate() +2);
        const date8 = new Date();
        date8.setDate(date8.getDate() +5);
        const date9 = new Date();
        date9.setDate(date9.getDate() +3);
        const date10 = new Date();
        date10.setDate(date10.getDate() +5);
        const date11 = new Date();
        date11.setDate(date11.getDate() +1);
        const date12 = new Date();
        date12.setDate(date12.getDate() +4);
        const fakeAPI = [{
            id: 111,
            start_time: date1.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 1,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 112,
            start_time: date2.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 2,
                    attributes: {
                        title: "Encant0",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 113,
            start_time: date3.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 3,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Pulp fiction",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                 }
                }
            }
        },
        {
            id: 114,
            start_time: date4.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 115,
            start_time: date5.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 116,
            start_time: date6.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 117,
            start_time: date7.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 118,
            start_time: date8.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 119,
            start_time: date9.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 110,
            start_time: date10.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 1111,
            start_time: date11.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        {
            id: 1112,
            start_time: date12.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        ];
        const array = sortScreenings(fakeAPI);
        expect(array).toHaveLength(10);
    })
    it("should return all screenings for the next 5 days if there are less than 10", ()=>{
        const date1 = new Date();
        date1.setDate(date1.getDate() +4);
        const date2 = new Date();
        date2.setDate(date2.getDate()+1);
        const date3 = new Date();
        date3.setDate(date3.getDate() +2);
        const date4 = new Date();
        date4.setDate(date4.getDate() +3);
        const fakeAPI = [{
            id: 111,
            start_time: date1.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 1,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 112,
            start_time: date2.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 2,
                    attributes: {
                        title: "Encant0",
                        imdbId: "tt0105665",
                        intro: "About the movie",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }
            }
        },
        {
            id: 113,
            start_time: date3.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 3,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Pulp fiction",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                 }
                }
            }
        },
        {
            id: 114,
            start_time: date4.toString(),
            room: "Stora salongen",
            createdAt: "2025-02-05T07:36:11:258Z",
            updatedAt: "2025-02-05T07:36:11:258Z",
            movie: { 
                data: {
                    id: 4,
                    attributes: {
                        title: "Fire walk with me",
                        imdbId: "tt0105665",
                        intro: "Min granne Totoro",
                        image: {
                            url: "url",
                        },
                        createdAt: "2025-02-05T07:36:11:258Z",
                        updatedAt: "2025-02-05T07:36:11:258Z",
                        publishedAt: "2025-02-05T07:36:11:258Z"
                    }
                }   
            }
        },
        ];
        const array = sortScreenings(fakeAPI);
        expect(array).toHaveLength(4);
    })

})