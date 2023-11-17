import { env } from '@/env'
import { ErrorMessages } from '@/errors/error-messages'
import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository'
import { DayJs } from '@/utils/dateConvert/dayjs'

interface RefreshTokenUseCaseRequest {
  user_id: string
  refresh_token: string
}

export class RefreshTokenUseCase {
  constructor(private refreshTokensRepository: RefreshTokensRepository) {}

  async execute({ user_id, refresh_token }: RefreshTokenUseCaseRequest) {
    const dateExpires = new DayJs().addDays(
      Number(env.JWT_REFRESH_TOKEN_EXPIRESS.charAt(0)),
    )

    const userRefreshToken =
      await this.refreshTokensRepository.findRefreshTokenByUserId(user_id)

    if (userRefreshToken) {
      const expiredDate = new DayJs().compareDateIsBefore(
        userRefreshToken.expires_in,
      )

      if (expiredDate) {
        await this.refreshTokensRepository.deleteById(userRefreshToken.id)
        throw new ErrorMessages('Session expired!')
      }

      await this.refreshTokensRepository.updateRefreshToken({
        id: userRefreshToken.id,
        refresh_token,
        updated_at: new Date(),
      })
    } else {
      await this.refreshTokensRepository.create({
        refresh_token,
        user_id,
        expires_in: dateExpires,
      })
    }
  }
}
