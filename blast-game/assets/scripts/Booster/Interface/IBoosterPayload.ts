import { BoosterTypes } from '../BoosterTypes'

export default interface IBoosterPayload {
    type: BoosterTypes,
    radius?: number
}
