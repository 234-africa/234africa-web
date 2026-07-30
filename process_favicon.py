from PIL import Image
import sys

def strip_white_bg(input_path, output_path):
    print("Opening image...", input_path)
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        # Remove white / light grey background pixels
        if r > 220 and g > 220 and b > 220:
            newData.append((255, 255, 255, 0))
        elif r > 190 and g > 190 and b > 190 and abs(r - g) < 12 and abs(g - b) < 12:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    print("Saving to...", output_path)
    img.save(output_path, "PNG")
    print("SUCCESS: Saved transparent favicon!")

if __name__ == "__main__":
    strip_white_bg(
        "/Users/phil/.gemini/antigravity/brain/15828d30-a727-4171-8aca-29d8f4e69d44/.user_uploaded/media__1785394709357.jpg",
        "/Users/phil/.gemini/antigravity/scratch/234africa/assets/favicon.png"
    )
