export type Replace<TypeToBeChecked, KeyToBeReplaced extends keyof TypeToBeChecked, NewValueToUse>
    = Omit<TypeToBeChecked, KeyToBeReplaced> & {
        [P in KeyToBeReplaced]: NewValueToUse
    }

export type ValueOf<T> = T[keyof T]