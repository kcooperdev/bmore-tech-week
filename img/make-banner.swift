import AppKit
import CoreText
import Foundation

let width = 1584
let height = 396
let outURL = URL(fileURLWithPath: CommandLine.arguments[1])
let skyURL = URL(fileURLWithPath: CommandLine.arguments[2])
let fontURL = URL(fileURLWithPath: CommandLine.arguments[3])

var error: Unmanaged<CFError>?
guard CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, &error) else {
  fputs("Could not register Figtree\n", stderr)
  exit(1)
}

guard let sky = NSImage(contentsOf: skyURL) else {
  fputs("Could not read sky image\n", stderr)
  exit(1)
}

let canvas = NSImage(size: NSSize(width: width, height: height))
canvas.lockFocus()

NSColor(calibratedRed: 6 / 255, green: 16 / 255, blue: 42 / 255, alpha: 1).setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: width, height: height)).fill()

let skySize = sky.size
let scale = max(CGFloat(width) / skySize.width, CGFloat(height) / skySize.height)
let drawW = skySize.width * scale
let drawH = skySize.height * scale
let drawX = (CGFloat(width) - drawW) / 2
let drawY = (CGFloat(height) - drawH) * 0.15
sky.draw(
  in: NSRect(x: drawX, y: drawY, width: drawW, height: drawH),
  from: .zero,
  operation: .copy,
  fraction: 1
)

let cream = NSColor(calibratedRed: 243 / 255, green: 234 / 255, blue: 215 / 255, alpha: 1)
let gold = NSColor(calibratedRed: 226 / 255, green: 177 / 255, blue: 60 / 255, alpha: 1)
let techFill = NSColor(calibratedRed: 244 / 255, green: 204 / 255, blue: 92 / 255, alpha: 1)

func font(_ size: CGFloat, weight: NSFont.Weight) -> NSFont {
  let base = CTFontCreateWithName("Figtree" as CFString, size, nil)
  let traits: [NSAttributedString.Key: Any] = [:]
  let descriptor = (base as NSFont).fontDescriptor.addingAttributes([
    .traits: [NSFontDescriptor.TraitKey.weight: weight.rawValue]
  ])
  return NSFont(descriptor: descriptor, size: size) ?? (base as NSFont)
}

func drawRight(_ text: String, font: NSFont, attrs: [NSAttributedString.Key: Any], y: CGFloat, xRight: CGFloat) -> CGFloat {
  var next = attrs
  next[.font] = font
  let attributed = NSAttributedString(string: text, attributes: next)
  let size = attributed.size()
  attributed.draw(at: NSPoint(x: xRight - size.width, y: y))
  return size.height
}

let right: CGFloat = CGFloat(width) - 72
var y: CGFloat = 78

let urlFont = font(22, weight: .semibold)
_ = drawRight(
  "See more details at www.bmoretechweek.com",
  font: urlFont,
  attrs: [.foregroundColor: gold],
  y: y,
  xRight: right
)

y += 40
let dateFont = font(36, weight: .bold)
_ = drawRight(
  "April 26 to 30, 2027",
  font: dateFont,
  attrs: [.foregroundColor: cream],
  y: y,
  xRight: right
)

y += 58
let titleFont = font(78, weight: .medium)
let techFont = font(78, weight: .semibold)

let weekAttrs: [NSAttributedString.Key: Any] = [
  .font: titleFont,
  .foregroundColor: cream,
  .strokeColor: cream,
  .strokeWidth: 2.4,
]
let techAttrs: [NSAttributedString.Key: Any] = [
  .font: techFont,
  .foregroundColor: techFill,
  .strokeColor: gold,
  .strokeWidth: -1.2,
  .shadow: {
    let shadow = NSShadow()
    shadow.shadowColor = gold.withAlphaComponent(0.7)
    shadow.shadowBlurRadius = 16
    shadow.shadowOffset = .zero
    return shadow
  }(),
]
let line = NSMutableAttributedString()
line.append(NSAttributedString(string: "Tech", attributes: techAttrs))
line.append(NSAttributedString(string: " ", attributes: weekAttrs))
line.append(NSAttributedString(string: "Week", attributes: weekAttrs))
let lineSize = line.size()
line.draw(at: NSPoint(x: right - lineSize.width, y: y))

y += 78
let cityAttrs: [NSAttributedString.Key: Any] = [
  .foregroundColor: cream,
  .strokeColor: cream,
  .strokeWidth: 2.4,
]
_ = drawRight("Baltimore", font: titleFont, attrs: cityAttrs, y: y, xRight: right)

canvas.unlockFocus()

guard let tiff = canvas.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff),
      let jpeg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.92])
else {
  fputs("Could not encode JPEG\n", stderr)
  exit(1)
}

try jpeg.write(to: outURL)
print("wrote \(outURL.path) \(width)x\(height)")
