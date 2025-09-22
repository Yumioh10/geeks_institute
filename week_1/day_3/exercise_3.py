# 1. Define the class Song
class Song():
   """Class that represente a song and its lyrics"""
   def __init__(self, lyrics):
      """Initialize the song object"""
      self.lyrics = lyrics

# 2. Create th method sing_me_a_song
   def sing_me_a_song(self):
      """print each line of the song's lyrics"""
      for line in self.lyrics:
         print(line)

# 3. Create an object
stairway= Song(["There is a lady who's sure", "all that glitters is gold", "and she is buying a stairway to heaven"])

# 4. Calling the method sing_me_a_song
stairway.sing_me_a_song()

