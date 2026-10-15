'use client'

import { useState, type KeyboardEvent } from 'react'
import { TicketNote } from '@/components/ticket-note'

type Include = { lead: string; rest: string } | { note: string }

const passes: Array<{
  id: string
  name: string
  price: string
  limit?: string
  description: string
  plus?: string
  includes: Include[]
}> = [
  {
    id: 'community',
    name: 'General Admission (Community Pass)',
    price: '$0',
    description:
      'Claim your spot at the main event! Connect with the local tech ecosystem, founders, and developers.',
    includes: [
      { lead: 'Entry', rest: ' to the main panel discussions, workshops & fireside chats' },
      { lead: 'Access', rest: ' to public networking zones' },
      {
        lead: 'The Tech Week Digital Perks Bundle',
        rest: ' (software trials & sponsor credits sent via email)',
      },
      {
        note: 'Note: Food and drinks are available for individual purchase directly from the restaurant menu.',
      },
    ],
  },
  {
    id: 'week',
    name: 'Week Pass',
    price: '$75',
    limit: 'Only 25 for the week.',
    description:
      'The whole week. Drink vouchers you redeem at a participating restaurant, with a closer seat at the conference.',
    plus: 'Includes everything in General Admission PLUS:',
    includes: [
      {
        lead: 'Drink vouchers:',
        rest: ' Two, redeemable at participating restaurants and venues.',
      },
      {
        lead: 'Front-Row Reserved Seating:',
        rest: ' Guaranteed prime viewing close to the stage for the main panels.',
      },
      {
        lead: 'Premium Swag Bag:',
        rest: ' A high-utility event tote packed with physical tech gear and premium merchandise sponsored by top brands.',
      },
      {
        lead: 'Fast-Track Entry:',
        rest: ' Skip the general public queue at the door.',
      },
    ],
  },
]

function includeText(item: Include) {
  return 'note' in item ? item.note : `${item.lead}${item.rest}`
}

export function TicketChooser() {
  const [index, setIndex] = useState(0)
  const pass = passes[index]

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next =
      event.key === 'ArrowRight' ? (index + 1) % passes.length : (index - 1 + passes.length) % passes.length
    setIndex(next)
    const choice = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]
    choice?.focus()
  }

  return (
    <div className="ticket-board">
      <h2 className="ticket-board-title">Two passes</h2>

      <div className="ticket-choice" role="radiogroup" aria-label="Passes" onKeyDown={onKeyDown}>
        {passes.map((item, itemIndex) => {
          const selected = itemIndex === index
          return (
            <button
              key={item.id}
              className="ticket-pick"
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(itemIndex)}
            >
              <span className="ticket-pick-name">{item.name}</span>
              <span className="ticket-pick-price">
                {item.price}
                {item.limit ? <span className="ticket-pick-limit">{item.limit}</span> : null}
              </span>
              <span className="ticket-pick-copy">{item.description}</span>
            </button>
          )
        })}
      </div>

      <div className="ticket-detail" aria-live="polite">
        <h3 className="ticket-detail-name">{pass.name}</h3>
        {pass.plus ? <p className="ticket-detail-plus">{pass.plus}</p> : null}
        <ul className="ticket-includes">
          {pass.includes.map((item) => (
            <li key={includeText(item)}>
              {'note' in item ? (
                <em>{item.note}</em>
              ) : (
                <>
                  <strong>{item.lead}</strong>
                  {item.rest}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="ticket-remind">
        <TicketNote pass={pass.name} />
      </div>
    </div>
  )
}
