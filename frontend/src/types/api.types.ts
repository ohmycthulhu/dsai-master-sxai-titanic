export type PassengerId = number
export type Survival = 0 | 1

export type PersonProcessed = {
  Age: number,
  Cabin: number,
  Embarked: number,
  Fare: number,
  Parch: number,
  Pclass: number,
  Sex: number,
  SibSp: number,
}

export type PersonRaw = {
  Age: number | null,
  Cabin: string | null,
  Child: boolean,
  Embarked: string,
  Fare: number,
  Name: string,
  Parch: number,
  PassengerId: number,
  Pclass: 1 | 2 | 3,
  Sex: 'male' | 'female',
  SibSp: number,
  Survived: Survival,
  Covered: boolean,
  Ticket: string
}

export type PersonData = {
  raw: PersonRaw,
  processed: PersonProcessed
}

export type PersonsListResponse = {
  data: PersonData[]
}

export type PersonInfoResponse = {
  row: PersonData,
  prediction: Survival,
  id: PassengerId,
}

export type StatisticsResponse = {
  rule_coverage: number,
  accuracy: number,
  false_negative: number,
  false_positive: number
}
