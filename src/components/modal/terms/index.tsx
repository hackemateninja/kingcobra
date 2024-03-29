import { IPlainObject } from '@/def/IPlainObject';

const Terms: React.FC<IPlainObject> = (props) => {
  const handlerModalOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    document.getElementById('modalBody').scrollTo(0, 0);
    const target = e.target as HTMLAnchorElement;
    props.onOpenModal(target.dataset.type);
  };

  return (
    <>
      <p>Effective Date: December 17, 2020</p>
      <p>
        These Terms of Use (“<strong>Terms of Use</strong>”) for AutoWeb, Inc. and its subsidiaries and affiliated
        entities (collectively “<strong>AutoWeb</strong>,” “<strong>Company</strong>,” “<strong>we</strong>”, “
        <strong>us</strong>” or “<strong>our</strong>”) apply to this website, our email marketing and mobile
        applications (each an “<strong>AutoWeb Site</strong>” and collectively, the “<strong>AutoWeb Sites</strong>”).
        The AutoWeb Websites, including the services and features contained herein, are offered to you, the user,
        conditioned on your acceptance of, and agreement in the manner set forth herein to be bound by, without
        modification, all the terms and conditions contained within these Terms of Use. The Terms of Use also apply to
        any co-branded or framed version of the Website.
      </p>
      <h3>
        <strong>
          We encourage Consumers to read these Terms of Use carefully before providing any Personal Information on any
          AutoWeb Site.
        </strong>
      </h3>
      <p>
        By accessing, browsing and/or using the AutoWeb Websites, you acknowledge that you have read, understood, and
        agree, to be bound by the Terms of Use and the terms of the AutoWeb Privacy Policy, which is incorporated by
        reference into these Terms of Use and can be reviewed by clicking on the following link
        <a href="#privacy" data-type="privacy" onClick={handlerModalOpen}>
          Privacy Policy
        </a>
        and to comply with all applicable laws, rules and regulations associated with your use of the AutoWeb Websites.
        If you do not agree to the Terms of Use, you are not authorized to use the AutoWeb Websites. The material
        provided on the AutoWeb Websites is protected by law, including, but not limited to, United States Copyright Law
        and international treaties. The AutoWeb Websites are controlled and operated by AutoWeb from its offices within
        the United States. AutoWeb makes no representation that materials available on the AutoWeb Websites are
        appropriate or available for use in other locations, and access to them from territories where their contents
        are illegal is prohibited. Those who choose to access the AutoWeb Websites from other locations do so at their
        own initiative and are responsible for compliance with applicable local laws.
      </p>
      <p id="tcpa_v3">
        By submitting your telephone number to us, you are consenting to be contacted via the phone number you provided
        (whether wireless or land line) by AutoWeb, the manufacturer of the vehicle you selected, by the Dealer(s) you
        selected, entities with whom AutoWeb may share your information pursuant to our
        <a href="#privacy" data-type="privacy" onClick={handlerModalOpen}>
          Privacy Policy
        </a>
        , or by the aforementioned entities' agents or representatives on their behalf. You agree that such contact may
        include marketing and encompass calls from a live agent, artificial or prerecorded voice messages, SMS texts, or
        use of an automatic telephone dialing system. The foregoing consent and opt-in is not required as a condition to
        purchasing or leasing vehicles or other products or services. Calls or text messages may be sent by AutoWeb or
        third parties even if your telephone number is registered on any state or federal Do Not Call list. You
        acknowledge that your carrier’s message and data rates may apply for calls or text messages and that neither
        AutoWeb nor the third parties are responsible for these charges. Messages may be recurring and frequency may
        vary.
      </p>
      <p>
        You may revoke your consent and opt-out from receiving automated calls or text messages at any time. You may
        opt-out of text messages by replying STOP to any text message you receive or follow other opt-out instructions
        included with the text message. You acknowledge and agree that you may receive a text message confirming your
        opt-out. To opt-out of automated telephone calls from AutoWeb (but not text messages), follow the instructions
        in our Privacy Policy. To opt-out of receiving automated telephone calls or texts from third parties, please
        contact the third party directly. Please note that if you opt out of automated calls, AutoWeb and any third
        parties reserve the right to make non-automated calls to you relating to any transaction or your relationship
        with AutoWeb or the third parties. To obtain assistance from our ConsumerCare Department, Reply AUTO HELP from a
        text message or contact our
        <a href="https://www.autoweb.com/contact-us.html" target="_blank" rel="noreferrer">
          ConsumerCare
        </a>
        Department as provided in our Privacy Policy.
      </p>
      <h2>
        <strong>Description of AutoWeb Services </strong>
      </h2>
      <p>
        AutoWeb is primarily engaged in the business of digital marketing for the automotive industry that assists
        automotive retail dealers, automotive manufacturers and other third parties market and sell new and used
        vehicles and related products and services to Consumers through our programs for consumer online referrals,
        dealer marketing products and services, email marketing, postal advertising and online advertising. The primary
        component of our business is the collection of personal information voluntarily provided by consumers in order
        to refer the consumer to third party vehicle dealers, vehicle manufacturers and other third parties offering
        products and services related to the automotive field and vehicle ownership, leasing or use. AutoWeb offers
        shopping and research features to help you acquire or lease a new or used vehicle, including new and used
        vehicle research, new and used vehicle price quotes supplied by vehicle dealers or manufacturers (“
        <strong>Vehicle Sellers</strong>”), used car vehicle listings, as well as information and links to providers of
        insurance, automotive finance, and other products and services.
      </p>
      <p>
        <strong>
          <u>
            AutoWeb is NOT a Vehicle Seller, a broker or agent for Vehicle Sellers or a provider of or broker or agent
            for automotive financing, insurance or other automotive-related products or services offered by third
            parties
          </u>
        </strong>
        ("<strong>Third Party Product and Service Providers</strong>"). Content and information displayed on the AutoWeb
        Websites is being provided for educational and research purposes only. The AutoWeb Websites are designed to
        enable users to obtain online and offline price, payment and financing quotes from participating Vehicle Sellers
        and Third Party Product and Service. AutoWeb does not provide these price or payment quotes and is not
        responsible for any such quotes or other information provided by Vehicle Sellers or third Party Product and
        Service Providers All quotes are estimates only and exclude state and local taxes, as well as any state and
        local governmental charges, including without limitation, registration, license and title fees, documentary
        fees, emissions certification fees and added accessories you may choose to place on a vehicle. On occasion,
        errors by the Vehicle Sellers or Third Party Product and Service Providers may occur in the entry of condition,
        warranty, pricing and/or payment data that forms the basis of such quotes furnished through AutoWeb Websites.
        AutoWeb is not responsible for these errors, but works with Vehicle Sellers and Third Party Product and Service
        Providers to correct these errors when they come to AutoWeb’s attention.
        <strong>
          <u>
            AutoWeb plays no part in actual sales or lease transaction or in brokering sales or lease transactions and
            has no control over the quality or safety of the vehicles advertised, nor the truth or accuracy of vehicle
            descriptions (including condition or installed options or equipment), the actual availability of any
            specific vehicle listed or the truth or accuracy of descriptions of other products or services. In addition,
            AutoWeb does not own or operate any services used for facilitating the actual sale or transfer of vehicles
            between buyers and sellers, including escrow services or title transfer services. Avoid any such service
            that claims to be operated by AutoWeb.
          </u>
        </strong>
        You are encouraged to thoroughly review any documents you are asked to sign at the time of purchase or lease of
        a vehicle or the purchase of other products or services, as neither a Vehicle Seller nor a Third Party Product
        and Service Provider is prohibited from independently negotiating all of the terms and conditions of the final
        sale or lease. Any terms, conditions, warranties or representations in a written contract with the Vehicle
        Seller or Third Party Product and Service Provider are legally binding upon you.
        <strong>
          <u>
            AutoWeb is not a party to any transaction between you and a Vehicle Seller or a Third Party Product and
            Servicer Provider and makes no representations or warranties, implied or otherwise, with respect to any
            vehicles (including, without limitation, the condition of vehicles listed on an AutoWeb Website) or any
            other products or services.
          </u>
        </strong>
      </p>
      <p>
        Because AutoWeb is only a publisher of content and other information provided by Vehicle Dealers and Third Party
        Product and Service Providers, in the event of any type of dispute over a vehicle or other product or services
        listed or displayed on an AutoWeb Website, you agree that any reliance on content or information provided on an
        AutoWeb Website is at your own risk, and unconditionally release AutoWeb , its affiliated companies, and each of
        their respective officers, directors, employees, agents, service providers, content providers and licensors (“
        <strong>AutoWeb Parties</strong>”) from any and all claims, demands and damages (actual and consequential) of
        every kind and nature, known and unknown, suspected and unsuspected, disclosed and undisclosed, arising out of
        or in any way connected with such dispute. AutoWeb is not responsible for statements made by others on AutoWeb
        Websites or on websites not owned or operated by AutoWeb. AutoWeb is not responsible for the accuracy,
        usefulness for a particular purpose or completeness of information provided by third parties that are available
        on or through the AutoWeb Websites. A consumer’s purchase request or inquiry regarding a vehicle may have
        originated on a website that is not owned or operated by AutoWeb and was referred to AutoWeb by the third party
        owner or operator of the website. AutoWeb is not responsible for any data, information, content or statements
        made or displayed on those third party websites. We invite you to bring to our attention any material on an
        AutoWeb Website that you believe to be inaccurate. Please forward a copy of the material you believe to be
        inaccurate and the reasons for your belief to the email address for our Consumer Care Department listed in the
        section below entitled “Contacting Us.”
      </p>
      <p>
        For your convenience, we make available a variety of links to other websites that we do not own or operate where
        you can obtain automotive related products and services, including insurance, warranties, financing and parts
        and service. Such links are provided for your convenience and reference only. Although we encourage you to visit
        such websites, we cannot guarantee the prices, terms, quality, reliability or performance of the products or
        services provided by these vendors. AutoWeb not responsible for the products or services these vendors provide
        or the statements, data, information or other content displayed on such websites. AutoWeb's inclusion of links
        to such websites does not imply any endorsement of the material on such websites.
      </p>
      <h2>
        <strong>Privacy</strong>
      </h2>
      <p>
        AutoWeb is committed to respecting your privacy and protecting your personally identifiable information. Any
        information AutoWeb may collect through your use of an AutoWeb Website is subject to AutoWeb’s Privacy Policy,
        which can be viewed at
        <a href="#privacy" data-type="privacy" onClick={handlerModalOpen}>
          Privacy Policy
        </a>
        .
      </p>
      <h2>
        <strong>Referrals to Vehicle Sellers and Other Internet Marketing Companies</strong>
      </h2>
      <p>
        AutoWeb reserves the right not to forward your purchase request to a Vehicle Seller or Third Party Product and
        Service Provider in its sole discretion. At its discretion, AutoWeb will attempt to forward your request to one
        or more Vehicle Sellers, although AutoWeb cannot assure you that AutoWeb will be able to match your request with
        a Vehicle Seller. In addition, AutoWeb may elect to send your consumer request to only one Vehicle Seller even
        if there is more than one Vehicle Seller available to provide to you a response to your consumer request.
        AutoWeb may resell your consumer request to other Internet marketing services companies that may be able to
        match your request with a Vehicle Seller. In certain circumstances AutoWeb may not be able to match your
        purchase request to any Vehicle Seller or alternative Internet marketing services company, in which event you
        will likely not hear back from AutoWeb or anyone referred to you by AutoWeb. When you do hear back from a
        Vehicle Seller or anyone else AutoWeb may refer your purchase request to please remember that AutoWeb is not
        responsible for anything they may say to you or any agreement you may enter into with them. The statements made
        by any such person to you or any agreement you reach with them are strictly between you and them and AutoWeb
        disclaims all responsibility.
      </p>
      <p>
        All transactions are conducted by and fulfilled through Vehicle Sellers that are not owned by or affiliated with
        AutoWeb.
        <strong>
          <u>AutoWeb does not guarantee vehicle prices or availability.</u>
        </strong>
        All vehicle descriptions and prices provided to you either on an AutoWeb Website or via separate contact by a
        Vehicle Seller following your submission of a purchase request are made by the participating Vehicle Sellers and
        not by AutoWeb. All vehicles prices and descriptions listed as available on an AutoWeb Website under the AutoWeb
        Used Car pages are established and electronically placed there by the participating Vehicle Seller that is
        offering the vehicle for sale or lease and not AutoWeb.
        <strong>
          ALL VEHICLES ARE SUBJECT TO PRIOR SALE AND MAY NOT BE AVAILABLE WHEN YOUR REQUEST IS PROCESSED. ALL PRICES AND
          TERMS ARE VALID ON DATE OF PUBLICATION ONLY.
        </strong>
        All data and information used in our research tools for configuring vehicles, selecting options, determining
        pricing, invoice or incentives on this Website are supplied by third party vendors for educational purposes only
        and are not intended to be binding on AutoWeb or the subscribing dealer. All tools appearing on an AutoWeb
        Website that allows for configuring vehicles with different options do so with such items that are typically
        available from the vehicle manufacturer and are typically available at local dealerships and may not be
        indicative of all of the configurations and equipment available on the vehicle being configured or the exact
        price(s) for a vehicle so equipped. Any discrepancies or mistakes made regarding vehicle availability, condition
        or pricing are not the responsibility of AutoWeb and should be directed to the dealer or third party vendor
        responsible for providing the information. AutoWeb does not guarantee either expressly or by implication that
        AutoWeb will find a vehicle that meets your specifications. Exact matches can be extremely difficult to find
        because of geographic location, vehicle popularity, and limited production or factory-to-dealer allocations.
      </p>
      <h2>
        <strong>Referrals for Automotive Credit </strong>
      </h2>
      <p>
        You are not required to apply for vehicle financing as a condition of your using an AutoWeb Website or any of
        the products or services offered on an AutoWeb Website. Independent third party lenders or their brokers or
        agents, and not AutoWeb, provide all vehicle-financing programs, information and quotes and make all credit
        evaluations and decisions. AutoWeb is not a lender, broker or agent, does not make credit evaluations or credit
        decisions, and is not responsible for credit evaluations or decisions made by third party lenders or their
        brokers or agents. If you choose to apply for financing through one of the independent third party lenders or
        their brokers or agents that market their finance products and services on AutoWeb Websites, you do so with this
        understanding. You may be asked to submit an application for credit and other documentation as the lender deems
        necessary in order to facilitate financing. Payment information that may be provided to you on AutoWeb Websites
        is for educational or research purposes only and shall not be considered as final. Your qualification for
        financing and, if qualified, the actual terms of your financing will be based upon, among other things, the
        results of an independent credit evaluation performed by or on behalf of the third party lender or their brokers
        or agents, current prevailing interest rates, and the length and amount of the financing requested.
      </p>
      <p>
        In order to provide a more efficient service, AutoWeb has contracted with third party truPayments, LLC (“
        <strong>truPayments</strong>”), a financial services and technology company. By selecting the “Get Payments
        &amp; Pricing,” you provide written instructions in accordance with the Fair Credit Reporting Act (“
        <strong>FCRA</strong>”) and other applicable laws for truPayments to request, receive, and retain a copy of your
        consumer credit report and score from consumer credit reporting agencies (<em>i.e.</em>, Experian, TransUnion
        and/or Equifax). This credit report may be used for a variety of reasons, including, but not limited to: (i)
        verifying the accuracy of the information you have provided, including the verification of your identity; (ii)
        assessing your credit history and credit score for the purpose of identifying products and/or services that you
        may be interested in or that you may prequalify for; and/or (iii) matching you with specific lenders and other
        third parties for products, services, offers and/or promotions for which you may qualify. This credit inquiry is
        considered a “soft credit inquiry,” which means it does not affect your credit score. Soft credit inquiries are
        shown only on copies of credit disclosures that are provided to you. Creditors and other third-party users of
        credit reports cannot see soft inquiries. All credit inquiries are made by truPayments and all consumer credit
        reports sent to lenders or third parties are transmitted by truPayments.
        <strong>
          <u>AutoWeb does not obtain or retain any consumer credit information from truPayments</u>
        </strong>
        . AutoWeb merely acts a conduit to facilitate truPayments receipt of a consumer credit report for the purposes
        described above. Upon your request, to truPayments at support@trupayments.com will inform you whether it
        requested credit information about you and will provide the name and address of the consumer reporting agency
        that furnished the report or information.
      </p>
      <h2>
        <strong>Referrals for Insurance </strong>
      </h2>
      <p>
        You are not required to apply for vehicle insurance as a condition of your using an AutoWeb Website or any of
        the products or services offered on an AutoWeb Website. Independent third party insurance companies or their
        brokers or agents, and not AutoWeb, provide all vehicle insurance programs, information and quotes. AutoWeb is
        not an insurance company or broker or agent acting on behalf of any insurance company or for the consumer and is
        not responsible for insurance quotes or policies made or offered by third party insurance company’s or their
        brokers or agents. If you choose to apply for insurance through one of the independent third parties that market
        their insurance products and services on AutoWeb Websites, you do so with this understanding. You may be asked
        to submit an application for quotes and other documentation as the third party deems necessary in order to
        facilitate the quote or policy. Payment information provided to you on AutoWeb Websites is for educational
        purposes only and shall not be considered as final. Your qualification for insurance and, if qualified, the
        actual terms of your policy will be based upon, among other things, the results of an independent evaluation
        performed by or on behalf of the third party.
      </p>
      <p>
        The insurance coverage presented by insurers is designed to meet the insurance needs of a majority of consumers.
        Your particular circumstances may differ and thus may require additional information. By supplying these
        information resources, AutoWeb.com is not making any recommendations or providing any advice as to whether or
        not any particular insurance coverage is suitable for your individual circumstance. AutoWeb does not endorse or
        recommend any specific insurance company or coverage plan. Your decision to select any particular insurance
        company and coverage plan should be based upon your own assessment of your individual needs and the amount of
        insurance coverage that meets those needs. All premiums displayed are estimates and not guaranteed.
      </p>
      <h2>
        <strong>Referrals for Vehicle Service Contracts</strong>
      </h2>
      <p>
        AutoWeb, Inc. is the authorized marketer of vehicle service contracts offered and sold by third parties, either
        directly or indirectly through third party intermediaries, brokers or selling agents (who may also provide the
        registration platform to purchase vehicle service contracts from the third party administrator or obligor with
        whom a consumer enters into the vehicle service contract). Neither AutoWeb nor its affiliated websites are
        administrators or obligors under the vehicle service contracts offered or sold by these third parties. The
        vehicle service contracts marketed by AutoWeb and its affiliated websites are offered by third-party providers
        that represent that they are licensed or registered service contract providers. The third-party service contract
        providers underwrite the vehicle service contracts and determine the terms and conditions of the vehicle service
        contracts. Vehicle service contracts marketed by AutoWeb and its affiliated websites are not available for
        purchase by consumers in California, Florida, Massachusetts, and Missouri. Consumers are encouraged to review
        the vehicle service contracts provided by the third-party service contract providers for details on coverages,
        limits, deductibles, conditions, exclusions, and terms provided by the vehicle service contracts before entering
        into the vehicle service contract.
      </p>
      <h2>
        <strong>Referrals For Conditional Trade-In Offers or Offers to Purchase Vehicles</strong>
      </h2>
      <p>
        AutoWeb may display on AutoWeb Websites links to websites of third parties (“<strong>Program Providers</strong>
        ”) whereby you may request: (i) conditional offers to purchase your used vehicle from third party vehicle
        dealers participating in the Program Provider’s network (“<strong>Participating Dealers</strong>”) (each such
        offer being a “<strong>Conditional Trade-In Offer</strong>”) and/or (ii) an estimated trade-in value range for
        your used vehicle (each such estimate being a “<strong>Trade-In Offer Estimate</strong>”). Each Trade-In Offer
        Estimate is for informational purposes only and does not constitute, and should not be construed as, a
        Conditional Trade-In Offer or otherwise as an offer by AutoWeb, a Program Provider, a Participating Dealer or
        any other third party to purchase your used vehicle. All Conditional Trade-In Offers are subject to inspection
        and verification of the vehicle by, or on behalf of, the applicable Participating Dealer, as well as the
        applicable terms and conditions of the Program Provider and the Participating Dealer and your full compliance
        with such terms and conditions. Conditional Trade-In Offers may not available in all areas and not all vehicles
        are eligible.
      </p>
      <p>
        Neither the Program Providers nor Participating Dealers are owned or operated by, or affiliated with, AutoWeb or
        otherwise act on behalf of AutoWeb. AutoWeb is not a broker, agent or retailer acting on behalf of any third
        party or for you and is not a party to, or responsible for, any offers, information, or quotes to purchase your
        vehicle offered by third parties or their brokers, agents, or customers. If you choose to accept an offer to
        purchase your vehicle, you do so with this understanding, and you are encouraged to review carefully the terms
        and conditions of any offer to purchase your vehicle. You are not required to request any offer to purchase your
        vehicle or an estimated trade-in value as a condition to you using an AutoWeb Website or any of the products or
        services offered on an AutoWeb Website.
      </p>
      <p>
        <strong>
          AUTOWEB DOES NOT MAKE ANY REPRESENTATION OR WARRANTY THAT YOU WILL BE ABLE TO SELL YOUR VEHICLE, OBTAIN AN
          ACCEPTABLE PRICE FOR YOUR VEHICLE, RECEIVE ANY INQUIRIES OR SOLICITATIONS FROM PARTICIPATING DEALERS, OR
          RECEIVE ANY TRADE-IN OFFER ESTIMATE RELATING TO, OR CONDITIONAL TRADE-IN OFFER FOR, YOUR VEHICLE. IN THE EVENT
          THAT ANY CLAIMS OR DISPUTES ARISE OUT OF AN ACTUAL OR POTENTIAL TRANSACTION INVOLVING A CONDITIONAL TRADE-IN
          OFFER, YOU AGREE TO LOOK SOLELY TO THE PARTICIPATING DEALER FOR YOUR REMEDY AND NOT TO AUTOWEB.
        </strong>
      </p>
      <h2>
        <strong>Referrals for Other Products and Services </strong>
      </h2>
      <p>
        You are not required to purchase or subscribe to any product or service as a condition of your using an AutoWeb
        Website or any of the products or services offered on an AutoWeb Website. Independent third parties, and not
        AutoWeb, offer these products and services. AutoWeb is not a broker, agent or retailer acting on behalf of any
        third party or for the consumer and is not responsible for any offers of products and services or for the
        products or services offered by third parties or their brokers or agents. If you choose to purchase or subscribe
        for any of these products or services, you do so with this understanding.
      </p>
      <h2>
        <strong>Advertising Presented on AutoWeb Websites </strong>
      </h2>
      <p>
        Your correspondence or business dealings with, or participation in promotions of, advertisers found on or
        through an AutoWeb Website, including payment and delivery of related products or services, and any other terms,
        conditions, warranties or representations associated with such dealings, are solely between you and such
        advertiser. You acknowledge and agree that AutoWeb will not be responsible or liable for any loss or damage of
        any sort incurred as the result of any such dealings or as the result of the presence of such advertising on an
        AutoWeb Website.
      </p>
      <h2>
        <strong>Rebates and Incentives </strong>
      </h2>
      <p>
        Information regarding rebates or incentives as they appear on AutoWeb Websites are provided to AutoWeb from
        independent third party data providers and republished for educational and research benefit only. AutoWeb relies
        on third party providers for this information and is not verified by AutoWeb. Rebate and incentive information
        on AutoWeb Websites should not be and is not intended to be a substitute for direct communication between you
        and the manufacturer or manufacturer's dealer/agent. Any regional and national cash incentives or rebates
        offered to consumers by the manufacturer are exclusively between you and the manufacturer or dealer and may
        affect the actual sale price of the vehicle. AutoWeb does not participate in any such program and is not
        responsible for ensuring the incentive amount or your receipt of such benefits.
      </p>
      <h2>
        <strong>Proprietary Rights and Use Limitations </strong>
      </h2>
      <p>
        AutoWeb Websites are for your personal, non-commercial use. All materials on or available through AutoWeb
        Websites, including, without limitation, names, logos, trademarks, images, text, columns, graphics, photographs,
        information or data, illustrations, artwork, software, clips and other elements making up a website
        (collectively, "<strong>Content</strong>") are protected by copyrights, trademarks and other intellectual
        property rights owned and controlled by AutoWeb or by third parties that have licensed or otherwise provided
        their materials to AutoWeb. You may not modify, copy, distribute, transmit, display, perform, reproduce,
        publish, license, create derivative works from, transfer, or sell any Content obtained from an AutoWeb Website.
        The Content available through AutoWeb Websites is the sole property of AutoWeb or its licensors and is protected
        by patent, copyright, trademark and other intellectual property laws. Except as otherwise explicitly agreed in
        writing, AutoWeb-owned content received through an AutoWeb Website may be downloaded, displayed, and printed for
        your personal, non-commercial use only. Content owned by AutoWeb licensors may be subject to additional
        restrictions. You agree not to reproduce, retransmit, distribute, disseminate, sell, publish, broadcast or
        circulate the content received through an AutoWeb Website to anyone, including but not limited to others in the
        same company or organization, except as authorized by AutoWeb by express prior written consent or in connection
        with your use of social media functions provided by AutoWeb on AutoWeb Websites.
      </p>
      <p>
        You have no right to use any names, marks, logos, copyright titles, trademarks, service marks or other property
        of AutoWeb or any third party that provides Content to AutoWeb for display on the AutoWeb Websites, except as
        expressly provided herein. Any other trademarks or service marks and associated logos found herein are the
        trademarks or service marks of their respective owners. All rights not granted herein are hereby expressly
        reserved by AutoWeb and its licensors.
      </p>
      <p>
        We respect the intellectual property of others. If you believe that your work, trademark or other intellectual
        property has been copied, displayed or otherwise infringed by us or by any third party on an AutoWeb Website,
        please provide the information specified below.
      </p>
      <ul>
        <li>
          A description of the copyrighted work, trademark or other intellectual property that you claim has been
          infringed upon;
        </li>
        <li> The reasons why you believe an infringement of your intellectual property has occurred; </li>
        <li>
          A description of where the material that you claim is infringing is located on an AutoWeb Website, including
          the URL of the page on which it appears; and
        </li>
        <li>Your address, telephone number and e-mail address.</li>
      </ul>
      <p>
        Your written notice containing the foregoing information should be sent to AutoWeb at the following address:
      </p>
      <p className="center-text">
        AutoWeb, Inc.
        <br /> 6410 Oak Canyon, Suite 250
        <br /> Irvine, CA 92618-5214
        <br /> United States
        <br /> Attention: Legal Department
      </p>
      <h2>
        &nbsp;<strong>Liability Disclaimer </strong>
      </h2>
      <p>
        ALL CONTENT OR INFORMATION PROVIDED ON AUTOWEB WEBSITES IS FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY AND DOES
        NOT IN ANY MANNER CREATE A LEGAL CONTRACT EXPRESS OR IMPLIED BETWEEN AUTOWEB AND YOU. IF YOU RELY ON AN AUTOWEB
        WEBSITE OR ANY CONTENT, INFORMATION, PRODUCT OR SERVICE AVAILABLE THROUGH AN AUTOWEB WEBSITE, YOU DO SO AT YOUR
        OWN RISK. YOU UNDERSTAND THAT THERE MAY BE DELAYS, OMISSIONS, INTERRUPTIONS, INACCURACIES, ERRORS AND/OR OTHER
        PROBLEMS WITH THE CONTENT, INFORMATION, PRODUCTS, AND SERVICES DISPLAYED ON OR PROMOTED OVER THE AUTOWEB
        WEBSITES. AUTOWEB WEBSITES ARE PROVIDED TO YOU "AS IS" WITHOUT ANY WARRANTY OF ANY KIND, AND ALL WARRANTIES,
        EXPRESS OR IMPLIED, ARE HEREBY DISCLAIMED. NEITHER AUTOWEB NOR ITS AFFILIATES, AGENTS AND LICENSORS, REPRESENT
        OR WARRANT THE ACCURACY, COMPLETENESS, CURRENTNESS, NONINFRINGEMENT, TITLE, MERCHANTABILITY OR FITNESS FOR A
        PARTICULAR PURPOSE OF THE CONTENT OR INFORMATION AVAILABLE THROUGH THE AUTOWEB WEBSITES (OR ANY CONTENT,
        INFORMATION, PRODUCTS OR SERVICES THAT ARE REFERRED TO, ADVERTISED OR PROMOTED ON, OR SOLD THROUGH AN AUTOWEB
        WEBSITE). NOR DO WE OR THEY GUARANTEE THAT THE AUTOWEB WEBSITES WILL BE ERROR FREE, OR CONTINUOUSLY AVAILABLE,
        OR THAT AN AUTOWEB WEBSITE WILL BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. AUTOWEB AND ITS AFFILIATES,
        AGENTS OR LICENSORS WILL NOT BE LIABLE FOR ANY CLAIMS, ACTIONS OR JUDGMENTS ARISING OUT OF OR RELATED TO ANY
        CONTENT POSTED TO AN AUTOWEB WEBSITE BY YOU OR ANY OTHER THIRD PARTY.
      </p>
      <p>
        UNDER NO CIRCUMSTANCES WILL AUTOWEB OR ITS AFFILIATES, AGENTS OR LICENSORS BE LIABLE TO YOU OR ANYONE ELSE FOR
        ANY DAMAGES OTHER THAN DIRECT DAMAGES, ARISING OUT OF YOUR USE OF ANY AUTOWEB WEBSITE OR ANY PRODUCT OR SERVICE
        LINKED TO FROM OR ADVERTISED OR PROMOTED ON AN AUTOWEB WEBSITE, INCLUDING, WITHOUT LIMITATION, CONSEQUENTIAL,
        SPECIAL, INCIDENTAL, INDIRECT, PUNITIVE, EXEMPLARY, OR OTHER DAMAGES OF ANY KIND (INCLUDING LOST REVENUES OR
        PROFITS, LOSS OF BUSINESS OR LOSS OF DATA), EVEN IF WE ARE ADVISED BEFOREHAND OF THE POSSIBILITY OF SUCH
        DAMAGES. YOU AGREE THAT THE LIABILITY OF AUTOWEB AND ITS AFFILIATES, AGENTS AND LICENSORS, IF ANY, ARISING OUT
        OF ANY KIND OF LEGAL CLAIM ARISING OUT OF OR OTHERWISE RELATED TO AN AUTOWEB WEBSITE WILL NOT EXCEED THE AMOUNT
        YOU PAID, IF ANY, FOR THE USE OF THE AUTOWEB WEBSITE OUT OF WHICH SUCH LIABILITY ALLEGEDLY ARISES. BECAUSE SOME
        STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL
        DAMAGES, SOME OF THESE LIMITATIONS MAY NOT APPLY TO YOU. YOU AGREE TO INDEMNIFY AND HOLD HARMLESS AUTOWEB, ITS
        AFFILIATES, EMPLOYEES, OFFICERS, DIRECTORS, SHAREHOLDERS, REPRESENTATIVES, AGENTS, SUPPLIERS AND LICENSORS
        AGAINST ANY AND ALL CLAIMS, OF WHATEVER NATURE, THAT ARISE OUT OF ANY CONTENT YOU PLACE ON ANY AUTOWEB SITE.
      </p>
      <h2>
        <strong>DISPUTE RESOLUTION</strong>
      </h2>
      <p>
        MOST CONSUMER CONCERNS CAN BE RESOLVED QUICKLY AND TO THE CONSUMER'S SATISFACTION BY CONTACTING AUTOWEB’S
        CUSTOMER CARE DEPARTMENT AS PROVIDED BELOW UNDER THE SECTION ENTITLED “CONTACTING US.” IN THE UNLIKELY EVENT
        THAT AUTOWEB’S CUSTOMER CARE DEPARTMENT IS UNABLE TO RESOLVE YOUR CONCERNS, WE EACH AGREE TO RESOLVE THOSE
        DISPUTES THROUGH BINDING ARBITRATION OR SMALL CLAIMS COURT INSTEAD OF IN COURTS OF GENERAL JURISDICTION TO THE
        FULLEST EXTENT PERMITTED BY LAW, AND SUBJECT TO THESE TERMS. ARBITRATION IS MORE INFORMAL THAN A LAWSUIT IN
        COURT. ARBITRATION USES A NEUTRAL ARBITRATOR INSTEAD OF A JUDGE OR JURY, ALLOWS FOR MORE LIMITED DISCOVERY THAN
        IN COURT, AND IS SUBJECT TO VERY LIMITED REVIEW BY COURTS. ARBITRATORS CAN AWARD THE SAME DAMAGES AND RELIEF
        THAT A COURT CAN AWARD. ANY ARBITRATION UNDER THESE TERMS WILL TAKE PLACE ON AN INDIVIDUAL BASIS TO THE MAXIMUM
        EXTENT PERMITTED BY LAW; CLASS ARBITRATIONS, CLASS ACTIONS OR REPRESENTATIVE ARBITRATIONS ARE NOT PERMITTED.
        AUTOWEB WILL PAY ALL ADMINISTRATIVE COSTS OF THE ARBITRATOR, NO MATTER WHO WINS, SO LONG AS YOUR CLAIM IS NOT
        FRIVOLOUS OR BROUGHT IN BAD FAITH. HOWEVER, IN ARBITRATION, BOTH YOU AND AUTOWEB WILL BE ENTITLED TO RECOVER
        ATTORNEYS´ FEES FROM THE OTHER PARTY TO THE SAME EXTENT AS YOU WOULD BE IN COURT.
      </p>
      <h2>
        <strong>Agreement to Arbitrate</strong>
      </h2>
      <p>
        (a) AutoWeb and you agree to arbitrate any and all disputes and claims between us arising out of or relating to
        these Terms of Use, our Privacy Policy or use of the sites, via the sites or through mobile application, except
        any disputes or claims which under governing law are not subject to arbitration, to the maximum extent permitted
        by applicable law. These terms to arbitrate is intended to be broadly interpreted and to make all disputes and
        claims between us subject to arbitration to the fullest extent permitted by law. However, any dispute you or we
        may have relating to copyrights or other intellectual property shall not be governed by this agreement to
        arbitrate. For the avoidance of doubt, this means that any claims you or we may have relating to intellectual
        property rights against the other, including seeking injunctive and other equitable relief, may be brought in a
        court of competent jurisdiction.&nbsp;
      </p>
      <p>
        This agreement to arbitrate otherwise includes, but is not limited to claims based in contract, tort, warranty,
        statute, fraud, misrepresentation or any other legal theory; claims that arose before this or any prior Terms of
        Use (including, but not limited to, claims relating to advertising); claims that are currently the subject of
        purported class action litigation in which you are not a member of a certified class; claims relating to our
        websites; claims arising out of or relating to the Telephone Consumer Protection Act; claims relating to your
        data privacy or information security; and claims that may arise after the termination of these Terms of Use.
      </p>
      <p>
        For purposes of this arbitration provision, references to "AutoWeb," "you," and "us" shall include our
        respective parent entities, subsidiaries, affiliates, agents, employees, predecessors in interest, successors
        and assigns, websites of the foregoing, as well as all authorized or unauthorized users or beneficiaries of
        services, products or information provided or made available under this or prior agreements between us relating
        to or arising from any aspect of your use or access of the sites.&nbsp;
      </p>
      <p>
        Notwithstanding the foregoing, either party may bring an individual action in small claims court. You agree
        that, by entering into these Terms of Use, including this agreement to arbitrate, you and AutoWeb are each
        waiving the right to a trial by jury or to participate in a class or representative action to the maximum extent
        permitted by law. These Terms evidences a transaction in interstate commerce, and thus the Federal Arbitration
        Act governs the interpretation and enforcement of this arbitration provision. This arbitration provision shall
        survive termination of these Terms of Use or your relationship with AutoWeb for any reason.
      </p>
      <p>
        (b) A party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of
        Dispute ("<strong>Dispute Notice</strong>''). The Notice to AutoWeb should be addressed to the following address
        ("<strong>Dispute Notice Address</strong>''):
      </p>
      <p className="center-text">
        AutoWeb, Inc.
        <br /> 400 North Ashley Drive, Suite 300
        <br /> Tampa, Florida 33602-4314
        <br /> Attention: Legal Department
      </p>
      <p>
        The Dispute Notice must describe the nature and basis of the claim or dispute and set forth the specific relief
        you seek from AutoWeb ("<strong>Demand</strong>''). If AutoWeb and you do not reach an agreement to resolve the
        claim within 30 days after the Dispute Notice is received, you or AutoWeb may commence an arbitration
        proceeding.&nbsp;
      </p>
      <p>
        (c) After AutoWeb receives a notice at the Dispute Notice Address that you have commenced arbitration, it will
        promptly reimburse you for your payment of the filing fee. The filing fee currently is $200, but is subject to
        change by the arbitration provider. The arbitration will be governed by the Consumer Arbitration Rules ("
        <strong>AAA Rules</strong>") of the American Arbitration Association ("<strong>AAA</strong>"), as modified by
        these Terms Of Use, and will be administered by the AAA. The AAA Rules are available online at
        <u>www.adr.org</u>, by calling the AAA at 1-800-778-7879, or by writing to the Notice Address. The AAA Rules may
        change from time to time, and you should review them periodically.
      </p>
      <p>
        All issues are for the arbitrator to decide, including the scope and enforceability of this arbitration
        provision as well as other terms and conditions of these Terms of Use, and the arbitrator shall have exclusive
        authority to resolve any such dispute relating to the scope and enforceability of this arbitration provision or
        any other term of these Terms of Use, including, but not limited to any claim that all or any part of this
        arbitration provision or these Terms of Use are void or voidable. However if putative class or representative
        claims are initially brought by either party in a court of law, and a motion to compel arbitration is brought by
        any party, then the court shall decide whether these Terms of Use permit class or representative proceedings.
        For the avoidance of doubt, the court and arbitrator shall be bound by these Terms of Use, including with regard
        to the class and representative waiver provision. In any arbitration, the arbitrator shall follow the applicable
        law. The arbitrator shall not have the power to commit manifest errors of law or legal reasoning, and any award
        rendered by the arbitrator that employs a manifest error of law or legal reasoning may be vacated or corrected
        by a court of competent jurisdiction for any such error.&nbsp;
      </p>
      <p>
        Unless AutoWeb and you agree otherwise, any arbitration will be governed by the substantive laws of your state,
        and hearings will take place in the county (or parish) of your permanent residence. Case management and other
        hearings shall be heard via telephone unless agreed to otherwise. Except as otherwise provided for herein,
        AutoWeb will pay all AAA filing, administration and arbitrator fees for any arbitration initiated in accordance
        with the notice requirements above. If, however, the arbitrator finds that either the substance of your claim or
        the relief sought in the Demand is frivolous or brought for an improper purpose (as measured by the standards
        set forth in Federal Rule of Civil Procedure 11(b)), then the payment of all such fees will be governed by the
        AAA Rules. In such case, you agree to reimburse AutoWeb for all monies previously disbursed by it that are
        otherwise your obligation to pay under the AAA Rules.
      </p>
      <p>
        During the arbitration, the amount of any settlement offer made by AutoWeb or you shall not be disclosed to the
        arbitrator until after the arbitrator determines the amount, if any, to which you or AutoWeb is entitled. In
        arbitration, and to the extent otherwise permitted by law, the parties may exchange “offers of compromise” or
        stipulate to judgments or awards in the same way the parties could in court, including for example, under
        California Code of Civil Procedure Section 998 for arbitrations taking place in the State of California. Such
        offers of compromise shall have the same force and effect as they would in a court proceeding. The arbitration
        proceedings shall otherwise remain confidential, except for purposes of seeking court intervention (if
        necessary).&nbsp;
      </p>
      <p>
        (d) Discovery and/or the exchange of non-privileged information relevant to the dispute will be governed by the
        AAA Rules.
      </p>
      <p>
        (e) YOU AND AUTOWEB AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY,
        AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING TO THE MAXIMUM EXTENT
        PERMITTED BY LAW. If this specific subparagraph (e) is found to be unenforceable in its entirety, then the
        entirety of this arbitration provision shall be null and void. However, if only a portion of this subparagraph
        (e) is found to be unenforceable, then the unenforceable portion of the provision shall be stricken, and the
        remainder of subparagraph (e) enforced. Any claims or causes of action seeking relief not subject to individual
        arbitration under applicable law shall be stayed in a court of competent jurisdiction pending completion of
        individual arbitration to the maximum extent permitted by law.
      </p>
      <p>
        (f) Notwithstanding any provision in these Terms of Use to the contrary, we agree that if AutoWeb makes any
        change to this arbitration provision (other than a change to the Dispute Notice Address) after your enrollment
        in a service or program or your use of the AutoWeb Sites, you may reject any such change and require AutoWeb to
        adhere to the language in this arbitration provision as written at the time at the time you initially requested
        or received any services from us if a dispute between us arises, by providing Notice to AutoWeb at the Dispute
        Notice Address in subsection (b) above.
      </p>
      <h2>
        <strong>No Unlawful or Prohibited Use </strong>
      </h2>
      <p>
        As a condition of your use of any AutoWeb Website, you warrant to AutoWeb that you will not use any AutoWeb
        Website for any purpose that is unlawful or prohibited by these Terms of Use.
      </p>
      <h2>
        <strong>Modification of These Terms of Use </strong>
      </h2>
      <p>
        These Terms of Use may be amended from time to time without notice, in AutoWeb’s sole discretion. Any changes to
        the Terms of Use will be effective immediately upon the posting of the revised Terms of Use on the AutoWeb
        Websites. By continuing to use an AutoWeb Website following our posting of any such change, you agree to be
        bound by these Terms of Use as changed. Please note that your use of certain materials and features of the
        AutoWeb Websites may be subject to additional terms and conditions. By using those materials and features, you
        also agree to be bound by such additional terms and conditions.
      </p>
      <h2>
        <strong>General Terms </strong>
      </h2>
      <p>
        These Terms of Use and your use of the AutoWeb Websites is governed by the laws of the State of Florida, USA.
        You hereby consent to the exclusive jurisdiction and venue of courts in Hillsborough County, Florida, USA in all
        disputes arising out of or relating to the use of any AutoWeb Website. Use of any AutoWeb Website is
        unauthorized in any jurisdiction that does not give effect to all provisions of these Terms of Use, including
        without limitation this paragraph. You agree that no joint venture, partnership, employment, or agency
        relationship exists between you and AutoWeb as a result of these Terms of Use or your use of an AutoWeb Website.
        AutoWeb's performance of these Terms of Use is subject to existing laws and legal process, and nothing contained
        in these Terms of Use is in derogation of AutoWeb's right to comply with law enforcement requests or
        requirements relating to your use of an AutoWeb Website or information provided to or gathered by AutoWeb with
        respect to such use. If any part of these Terms of Use is determined to be invalid or unenforceable pursuant to
        applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth
        above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision
        that most closely matches the intent of the original provision and the remainder of these Terms of Use shall
        continue in effect. These Terms of Use constitute the entire agreement between you, the user, and AutoWeb with
        respect to the AutoWeb Websites and they supersede all prior or contemporaneous communications and proposals,
        whether electronic, oral or written, between the user and AutoWeb with respect to the AutoWeb Websites. A
        printed version of these Terms of Use and of any notice given in electronic form shall be admissible in judicial
        or administrative proceedings based upon or relating to these Terms of Use to the same extent and subject to the
        same conditions as other business documents and records originally generated and maintained in printed form. Any
        rights not expressly granted by AutoWeb herein are reserved by AutoWeb.
      </p>
      <h2>
        <strong>Contacting Us</strong>
      </h2>
      <p>
        If you have any questions regarding these Terms of Use please contact our Consumer Care Department by email at
        <a href="mailto:consumercare@autoweb.com">consumercare@autoweb.com</a>, by calling via our toll-free number at
        (800) 267-2015.
      </p>
    </>
  );
};

export default Terms;
