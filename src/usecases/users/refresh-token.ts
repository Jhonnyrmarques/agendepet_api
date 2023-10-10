import { env } from '@/env'
import { RefreshTokensRepository } from '@/repositories/refresh-tokens-repository'
import { DayJs } from '@/utils/dateConvert/dayjs'

interface RefreshTokenUseCaseRequest {
  user_id: string
  refresh_token: string
}

export class RefreshTokenUseCase {
  constructor(private refreshTokensRepository: RefreshTokensRepository) {}

  async execute({ user_id, refresh_token }: RefreshTokenUseCaseRequest) {
    const userToken =
      await this.refreshTokensRepository.findRefreshTokenByUserId(user_id)

    if (userToken) {
      await this.refreshTokensRepository.deleteById(userToken.id)
    }

    const expires_in = new DayJs().addDays(
      Number(env.JWT_REFRESH_TOKEN_EXPIRESS.charAt(0)),
    )

    await this.refreshTokensRepository.create({
      user_id,
      refresh_token,
      expires_in,
    })
  }
}
