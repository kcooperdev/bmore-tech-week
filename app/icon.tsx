import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#241773',
          color: '#d4a017',
          fontSize: 340,
          fontWeight: 700,
          fontFamily: 'Impact, Arial Black, sans-serif',
          lineHeight: 1,
        }}
      >
        B
      </div>
    ),
    size,
  )
}
