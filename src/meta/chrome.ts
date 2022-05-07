import { T_Item_Form } from "./item"

export interface I_MessageResponseMap {
    'general': T_Item_Form
    'image': T_Item_Form
    'douban_movie': Omit<T_Item_Form, 'title' | 'language'>
}