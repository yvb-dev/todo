import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Task} from '../model/Task';

export class TestData {

    static categories: Category[] = [
        {id: 1, title: "Работа"},
        {id: 2, title: "Хобби"},
        {id: 3, title: "Отдых"},
        {id: 4, title: "Цели"},
        {id: 5, title: "Спорт"},
        {id: 6, title: "Срочные задачи"},
        {id: 7, title: "Автомобили"},
        {id: 8, title: "Ремонт"},
        {id: 9, title: "Покупки"},
        {id: 10, title: "Праздники"}
    ]

    static priorities: Priority[] = [
        {id: 1, title: "Высокий", color: "red"},
        {id: 2, title: "Средний", color: "yellow"},
        {id: 3, title: "Низкий", color: "green"}
    ]

    static tasks: Task[] = [
        {
            id: 1,
            title: "Пройти собеседование",
            completed: false,
            priority: TestData.priorities[0],
            category: TestData.categories[0],
            date: new Date('2020-18-2')
        },
        {
            id: 2,
            title: "Починить машину",
            completed: false,
            priority: TestData.priorities[2],
            category: TestData.categories[6],
            date: new Date('2020-18-2')
        },
        {
            id: 3,
            title: "Купить билеты на Таити",
            completed: false,
            priority: TestData.priorities[1],
            category: TestData.categories[2],
            date: new Date('2020-15-2')
        },
        {
            id: 4,
            title: "Марафон",
            completed: false,
            priority: TestData.priorities[1],
            category: TestData.categories[5],
            date:new Date('2020-18-1')
        },
        {
            id: 5,
            title: "Собрать документы",
            priority: TestData.priorities[1],
            category: TestData.categories[6],
            completed: true,
        }

    ]
}
