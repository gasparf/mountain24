import numpy as np
import cv2
import imutils
from skimage import exposure
from stitching import Stitcher

import firebase_admin
from firebase_admin import credentials, initialize_app, storage, firestore


def personal_stitch(userid, location):
    # Init firebase with credentials
    cred = credentials.Certificate("key.json")
    initialize_app(cred, {'storageBucket': 'mountainmadness2024.appspot.com'})

    # firebase client 
    db = firestore.client()
    

    # get 10 random photos from location 
    img_urls = ['./i1.jpg', './i2.jpg', './i3.jpg', './i5.jpg']
    ref = cv2.imread('./i4.jpg')
    images = [cv2.imread(url) for url in img_urls]

    # image stitching 
    personal = image_stitching(images, ref)

    if personal != None:
        # pass back image
        pass
    else:
        # pass back None? 
        pass


    # upload stitched photo to database 
    
    db.collection("Locations").document('testLocation').set({'CommunityStitch': personal})
    # data = {"direction": "South", "imageReference": "N/A", "latitude":55, "longitude":-15, "season":"Winter","tags":["test1","test2","test3"],"time":"Afternoon"}
    # location = "testLocation"
    # db.collection("Locations").document(location).collection("locationEntries").document("testEntry2").set(data)


def image_stitching(images, ref):
    images.append(ref)
    
    # match histogram
    for i in range(len(images)-1):
        images[i] = match_histograms(images[i], images[-1])

    # create stitcher ~ based on openCV version
    stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()

    # stitch images
    stitched = None
    (status, stitched) = stitcher.stitch(images)

    if status == 0:
        return stitched 
    else:
        return None


def match_histograms(src, ref):
    multi = True if src.shape[-1] > 1 else False
    matched = exposure.match_histograms(src, ref, multichannel=multi)
    return matched

def global_stitch(milestone, location):
    # location -> updated global stitch 
    pass

def main():
    personal_stitch(None, None)


if __name__ == '__main__':
    main()
















def image_stitching2(images):
    # Read the images
    image1 = images[0]
    image2 = images[1]

    # Convert the images to grayscale
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)


    # Initialize the SIFT detector
    sift = cv2.SIFT_create()

    keypoints = []
    descriptors = []
    # Find keypoints and descriptors in the images
    for i in range(len(images)):
        k, d = sift.detectAndCompute(images[i], None)
        keypoints.append(k)
        descriptors.append(d)

    # Initialize the FLANN matcher
    matcher = cv2.FlannBasedMatcher_create()

    # Match descriptors between the images
    matches = []
    for i in range(len(images)-1):
        matches.append(matcher.knnMatch(descriptors[i], descriptors[i+1], k=2))

    # Filter matches using the Lowe's ratio test
    all_good_matches = []
    for i in range(len(images)-1):
        good_matches = []
        for m, n in matches[i]:
            if m.distance < 0.75 * n.distance:
                good_matches.append(m)

        all_good_matches.append(good_matches)

    # Extract the matched keypoints
    homo = [np.eye(3)]
    for i in range(len(images)-1):
        points1 = np.float32([keypoints[i][m.queryIdx].pt for m in all_good_matches[i]]).reshape(-1, 1, 2)
        points2 = np.float32([keypoints[i+1][m.trainIdx].pt for m in all_good_matches[i]]).reshape(-1, 1, 2)

        # Find the perspective transformation
        H, _ = cv2.findHomography(points2, points1, cv2.RANSAC)
        homo.append(H)

    # Warp the second image onto the first
    # stitched_image = cv2.warpPerspective(images[1], homo[0], (images[0].shape[1] + images[1].shape[1], images[1].shape[0]))
    # stitched_image[0:images[0].shape[0], 0:images[0].shape[1]] = images[0]


    # Display the stitched image
    cv2.imshow('Stitched Image', stitched_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def image_stitching3(images):
    # Read the images
    image1 = images[0]
    image2 = images[1]

    # Convert the images to grayscale
    # gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    # gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
    gray1 = image1
    gray2 = image2

    # Initialize the SIFT detector
    sift = cv2.SIFT_create()

    # Find keypoints and descriptors in the images
    keypoints1, descriptors1 = sift.detectAndCompute(gray1, None)
    keypoints2, descriptors2 = sift.detectAndCompute(gray2, None)

    # Initialize the FLANN matcher
    matcher = cv2.FlannBasedMatcher_create()

    # Match descriptors between the images
    matches = matcher.knnMatch(descriptors1, descriptors2, k=2)

    # Filter matches using the Lowe's ratio test
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)

    # Extract the matched keypoints
    points1 = np.float32([keypoints1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    points2 = np.float32([keypoints2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)

    # Find the perspective transformation
    H, _ = cv2.findHomography(points2, points1, cv2.RANSAC)

    # Warp the second image onto the first
    result = cv2.warpPerspective(image2, H, (image1.shape[1] + image2.shape[1], image2.shape[0]))
    result[0:image1.shape[0], 0:image1.shape[1]] = image1

    # Display the stitched image
    cv2.imshow('Stitched Image', result)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def image_stitching4(images, ref):
    images.append(ref)
    ori_images = images.copy()
    
    # images = [cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) for image in images]
    
    # match histogram
    # for i in range(len(images)-1):
    #     images[i] = match_histograms(images[i], ref)

    # stitcher = Stitcher()
    stitcher = Stitcher(compensator="no", blender_type="no", crop=False)

    stitched = stitcher.stitch(images)

    cv2.imshow('personal', stitched)
    cv2.waitKey(0) 
    cv2.destroyAllWindows() 

 
